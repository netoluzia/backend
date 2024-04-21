import { FiscalDoc, Items } from '../../../models/Document'
import { HttpResponse } from '../../protocols'
import { ObjectId } from 'mongodb'

export interface ParamsCreateDocument {
  items: Items[]
  payment?: ObjectId | null
  client?: ObjectId
  amount_received: number
  change: number
  document: string
  discount?: number
  total?: number
  attendant?: ObjectId
  createdAt?: Date
  serie?: string | number
  reference?: string | null
  hash64: string
  hash4: string
  emission_date?: Date
  paid: boolean
  source: string | null
}

export interface ICreateDocumentRepository {
  createDocument(params: ParamsCreateDocument): Promise<FiscalDoc>
}

export interface ICreateDocumentController {
  handle(params: ParamsCreateDocument): Promise<HttpResponse<FiscalDoc>>
}

export interface ICountDocumentRepository {
  count(document: string): Promise<number>
}
