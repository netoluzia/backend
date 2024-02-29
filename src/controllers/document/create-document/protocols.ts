import { Client } from '../../../models/Client'
import { Document, DocumentType, Items } from '../../../models/Document'
import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'

export interface paramsCreateDocument {
  items: Items
  payment?: Payment
  client: Client
  document: DocumentType
}

export interface ICreateDocumentRepository {
  createDocument(): Promise<Document>
}

export interface CreateDocumentController {
  handle(params: paramsCreateDocument): HttpResponse<Document>
}
