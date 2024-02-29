import { Document } from '../../../models/Document'
import { HttpResponse } from '../../protocols'

export interface IGetDocumentsRepository {
  getDocuments(): Promise<Document[]>
}

export interface IGetDocumentsController {
  handle(): Promise<HttpResponse<Document[]>>
}
