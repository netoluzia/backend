import { Document, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import {
  ICreateDocumentController,
  ICreateDocumentRepository,
  ParamsCreateDocument,
} from './protocols'

export class CreateDocumentController implements ICreateDocumentController {
  constructor(
    private readonly createDocumentRepository: ICreateDocumentRepository
  ) {}
  async handle(params: ParamsCreateDocument): Promise<HttpResponse<Document>> {
    try {
      const { items } = params
      const total = items.reduce((accumulator: number, item: Items) => {
        return accumulator + item.total
      }, 0)

      const document = await this.createDocumentRepository.createDocument({
        ...params,
        total,
      })

      return {
        statusCode: 200,
        body: document,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      }
    }
  }
}
