import { ObjectId } from 'mongodb'
import { FiscalDoc, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import crypto from 'crypto'
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
  generateRandomHash(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|<>?'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  async signature(): Promise<{ hash64: string; hash4: string }> {
    const hash64 = this.generateRandomHash(64)
    const hash4 = this.generateRandomHash(4)
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
        const service = await repository.getMaterialFromService(
          item.id.toHexString()
        )
        if (!service) return true
        for await (const iterator of service.materials) {
          const rest = iterator.materialDetails.quantity - iterator.quantity
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
        emission_date,
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
      const { hash4, hash64 } = await this.signature()
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
      const doc = await this.createDocumentRepository.createDocument({
        ...params,
        total,
        reference,
        serie: new Date().getFullYear(),
        createdAt: new Date(),
        emission_date: emission_date ? new Date(emission_date) : new Date(),
        client: new ObjectId(client),
        payment: payment ? new ObjectId(payment) : null,
        items: auxItems,
        amount_received,
        change: change as number,
        expiryDate:
          params.document === 'FT'
            ? emission_date
              ? new Date(
                  new Date(emission_date).setDate(
                    new Date(emission_date).getDate() + 30
                  )
                )
              : new Date(new Date().setDate(new Date().getDate() + 30))
            : new Date(),
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
