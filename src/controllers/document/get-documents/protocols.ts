import { FiscalDoc } from '../../../models/Document'
import { HttpResponse } from '../../protocols'

export interface IGetDocumentsRepository {
  getDocuments(): Promise<FiscalDoc[]>
}

export interface IGetDocumentsController {
  handle(): Promise<HttpResponse<FiscalDoc[]>>
}
