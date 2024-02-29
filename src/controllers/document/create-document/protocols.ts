import { Document, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'

export interface ParamsCreateDocument {
  items: Items[]
  payment?: string
  client?: string
  document: string
  discount: number
  total?: number
  attendant: string
  createdAt?: Date
}

export interface ICreateDocumentRepository {
  createDocument(params: ParamsCreateDocument): Promise<Document>
}

export interface ICreateDocumentController {
  handle(params: ParamsCreateDocument): Promise<HttpResponse<Document>>
}
