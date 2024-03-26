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
export class CreateDocumentController implements ICreateDocumentController {
  constructor(
    private readonly createDocumentRepository: ICreateDocumentRepository,
    private readonly countDocumentType: ICountDocumentRepository
  ) {}
  calculateTotal(items: Items[]): number {
    return items.reduce((accumulator: number, item: Items) => {
      return accumulator + item.quantity * item.unit_price
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
  async handle(params: ParamsCreateDocument): Promise<HttpResponse<FiscalDoc>> {
    try {
      let { items, client, payment, document, amount_received, paid, source } =
        params
      const auxItems = items.map(
        ({ total, quantity, unit_price, ...rest }) => ({
          total: quantity * unit_price,
          quantity,
          unit_price,
          ...rest,
        })
      )
      paid = false
      const total = this.calculateTotal(items)
      const reference = await this.generateReference(document)
      let change: number | null = null

      if (document == 'RG' || document == 'FR') {
        change = amount_received - total
        paid = true
      }
      if (document == 'RG') {
        await MongoClient.db
          .collection('document')
          .findOneAndUpdate({ reference: source }, { $set: { paid: true } })
      }
      if (document == 'RG' && !source) {
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
        emission_date: params.emission_date || new Date(),
        client: new ObjectId(client),
        payment: payment ? new ObjectId(payment) : null,
        items: auxItems,
        amount_received,
        change: change as number,
        hash4,
        hash64,
        paid,
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
