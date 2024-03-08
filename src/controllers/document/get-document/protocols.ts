import { FiscalDoc } from '../../../models/Document'
import { HttpResponse } from '../../protocols'

export interface IGetDocumentController {
  handle(id: string): Promise<HttpResponse<FiscalDoc>>
}
export interface IGetDocumentRepository {
  getDocument(id: string): Promise<FiscalDoc>
}
