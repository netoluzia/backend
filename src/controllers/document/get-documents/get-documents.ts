import { FiscalDoc } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import { IGetDocumentsController, IGetDocumentsRepository } from './protocols'

export class GetDocumentsController implements IGetDocumentsController {
  constructor(
    private readonly getDocumentsRepository: IGetDocumentsRepository
  ) {}
  async handle(): Promise<HttpResponse<FiscalDoc[]>> {
    try {
      const documents = await this.getDocumentsRepository.getDocuments()
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
