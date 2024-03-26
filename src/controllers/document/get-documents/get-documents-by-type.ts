import { HttpResponse } from '../../protocols'
import {
  IGetDocumentsByTypeController,
  IGetDocumentsByTypeRepository,
} from './protocols'

export class GetDocumentsByDocuments implements IGetDocumentsByTypeController {
  constructor(
    private readonly getDocumentsByType: IGetDocumentsByTypeRepository
  ) {}
  async handle(): Promise<HttpResponse<any[]>> {
    try {
      const documents = await this.getDocumentsByType.getDocumentsByType()
      return {
        statusCode: 200,
        body: {
          data: documents,
          message: 'Documentos carregados com sucesso',
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
