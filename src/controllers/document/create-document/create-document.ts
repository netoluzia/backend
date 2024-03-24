import { ObjectId } from 'mongodb'
import { FiscalDoc, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import {
  ICountDocumentRepository,
  ICreateDocumentController,
  ICreateDocumentRepository,
  ParamsCreateDocument,
} from './protocols'
import crypto from 'crypto'
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
      const { items, client, payment, document, amount_received } = params
      const auxItems = items.map(
        ({ total, quantity, unit_price, ...rest }) => ({
          total: quantity * unit_price,
          quantity,
          unit_price,
          ...rest,
        })
      )
      const total = this.calculateTotal(items)
      const reference = await this.generateReference(document)
      const change = amount_received - total
      const { hash4, hash64 } = await this.signature()

      const doc = await this.createDocumentRepository.createDocument({
        ...params,
        total,
        reference,
        serie: new Date().getFullYear(),
        createdAt: new Date(),
        emission_date: params.emission_date || new Date(),
        client: new ObjectId(client),
        payment: new ObjectId(payment),
        items: auxItems,
        amount_received,
        change,
        hash4,
        hash64,
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
