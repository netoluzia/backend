import { ObjectId } from 'mongodb'
import { FiscalDoc, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import {
  ICreateDocumentController,
  ICreateDocumentRepository,
  ParamsCreateDocument,
} from './protocols'
import crypto from 'crypto'
export class CreateDocumentController implements ICreateDocumentController {
  constructor(
    private readonly createDocumentRepository: ICreateDocumentRepository
  ) {}
  async handle(params: ParamsCreateDocument): Promise<HttpResponse<FiscalDoc>> {
    try {
      const { items, client, payment } = params
      const total = items.reduce((accumulator: number, item: Items) => {
        return accumulator + item.total
      }, 0)

      const [ano, mes, dia, hora, minuto, segundo] =
        new Date().toLocaleString().match(/(\d+)/g) || []
      const document = await this.createDocumentRepository.createDocument({
        ...params,
        total,
        serie: new Date().getFullYear(),
        reference: `${dia}${mes}${ano}${hora}${minuto}${segundo}`,
        hash64: crypto
          .createHash('sha256')
          .update(`${dia}${mes}${ano}${hora}${minuto}${segundo}`)
          .digest('hex'),
        hash4: crypto
          .createHash('sha256')
          .update(`${dia}${mes}${ano}${hora}${minuto}${segundo}`)
          .digest('hex')
          .slice(0, 4),
        createdAt: new Date(),
        emission_date: params.emission_date || new Date(),
        client: new ObjectId(client),
        payment: new ObjectId(payment),
      })

      return {
        statusCode: 200,
        body: {
          message: 'Documento criado com sucesso',
          data: document,
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: 'Something went wrong',
          status: false,
        },
      }
    }
  }
}
