import { FiscalDoc } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import { IGetDocumentController, IGetDocumentRepository } from './protocols'

export class GetDocumentController implements IGetDocumentController {
  constructor(private readonly getDocumentRepository: IGetDocumentRepository) {}
  async handle(id: string): Promise<HttpResponse<FiscalDoc>> {
    try {
      const document = await this.getDocumentRepository.getDocument(id)

      return {
        body: {
          data: document,
          status: true,
          message: 'Operacao realizada com sucesso',
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          status: false,
          message: 'Operacao falhou',
        },
        statusCode: 500,
      }
    }
  }
}
