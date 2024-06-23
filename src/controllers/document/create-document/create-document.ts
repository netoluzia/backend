import { ObjectId } from 'mongodb'
import { FiscalDoc, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import {
  ICountDocumentRepository,
  ICreateDocumentController,
  ICreateDocumentRepository,
  ParamsCreateDocument,
} from './protocols'
import { MongoClient } from '../../../database/mongo'
import { MongoGetMaterialFormServiceRepository } from '../../../repositories/service/get-material-from-service/mongo-get-material-form-service'
import { MongoAddStockRepository } from '../../../repositories/materials/add-stock/mongo-add-stock'
export class CreateDocumentController implements ICreateDocumentController {
  constructor(
    private readonly createDocumentRepository: ICreateDocumentRepository,
    private readonly countDocumentType: ICountDocumentRepository
  ) {}
  calculateTotal(items: Items[]): number {
    return items.reduce((accumulator: number, item: Items) => {
      return accumulator + item.quantity * item.total
    }, 0)
  }
  async generateReference(document: string): Promise<string> {
    const [dia, mes, ano] = new Date().toLocaleDateString('pt-BR').split('/')

    return `${document}${dia}${mes}${ano}/${
      (await this.countDocumentType.count(document)) + 1
    }`
  }

  async signature(): Promise<{ hash64: string; hash4: string }> {
    const hash64 = '64'
    const hash4 = '4'
    return { hash64, hash4 }
  }

  async decrementStock(
    items: {
      item: string
      description: string
      total: number
      quantity: number
      unit_price: number
      id: ObjectId
    }[]
  ): Promise<boolean> {
    try {
      const identifiers: { material: string; qtd: number }[] = []
      const repository = new MongoGetMaterialFormServiceRepository()
      for await (const item of items) {
        const service = await repository.getMaterialFromService(String(item.id))
        for await (const iterator of service.materials) {
          const rest = iterator.materialDetails.quantity - iterator.quantity
          console.log(rest)
          if (rest < 0) return false
          identifiers.push({
            material: iterator.materialId,
            qtd: iterator.quantity,
          })
        }
      }
      const anotherRepository = new MongoAddStockRepository()
      for await (const iterator of identifiers) {
        // await anotherRepository.addStock(iterator.material, -1 * iterator.qtd)
        await anotherRepository.addStock({
          material: iterator.material,
          quantity: iterator.qtd,
          type: 'SAIDA',
        })
      }
      return true
    } catch (error: any) {
      console.log(error.message)
      return false
    }
  }
  async handle(params: ParamsCreateDocument): Promise<HttpResponse<FiscalDoc>> {
    try {
      let {
        items,
        client,
        payment,
        document,
        amount_received,
        paid,
        source,
        attendant,
      } = params
      const auxItems = items.map(
        ({ total, quantity, unit_price, id, ...rest }) => ({
          total: quantity * total,
          quantity,
          unit_price,
          id: new ObjectId(id),
          ...rest,
        })
      )
      paid = false
      const total = this.calculateTotal(items)
      const reference = await this.generateReference(document)
      let change: number | null = null

      if (document == 'RC' || document == 'FR') {
        change = amount_received - total
        paid = true
        const response = await this.decrementStock(auxItems)
        if (!response) throw new Error('Materiais em falta no stock')
      }
      if (document == 'RC') {
        await MongoClient.db
          .collection('document')
          .findOneAndUpdate({ reference: source }, { $set: { paid: true } })
      }
      if (document == 'RC' && !source) {
        return {
          statusCode: 200,
          body: {
            message: 'Introduza a referencia do documento de origem',
            status: true,
          },
        }
      }
      const { hash4, hash64 } = await this.signature()
      const doc = await this.createDocumentRepository.createDocument({
        ...params,
        total,
        reference,
        serie: new Date().getFullYear(),
        createdAt: new Date(),
        emission_date: new Date(String(params.emission_date)) || new Date(),
        client: new ObjectId(client),
        payment: payment ? new ObjectId(payment) : null,
        items: auxItems,
        amount_received,
        change: change as number,
        hash4,
        hash64,
        paid,
        attendant: new ObjectId(attendant),
      })

      return {
        statusCode: 200,
        body: {
          message: 'Documento criado com sucesso',
          data: doc,
          status: true,
        },
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: {
          message: error.message,
          status: false,
        },
      }
    }
  }
}
