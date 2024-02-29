import { Document } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import { IGetDocumentsController, IGetDocumentsRepository } from './protocols'

export class GetDocumentsController implements IGetDocumentsController {
  constructor(
    private readonly getDocumentsRepository: IGetDocumentsRepository
  ) {}
  async handle(): Promise<HttpResponse<Document[]>> {
    try {
      const documents = await this.getDocumentsRepository.getDocuments()
      return {
        statusCode: 200,
        body: documents,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      }
    }
  }
}
