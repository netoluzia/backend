import { ObjectId } from 'mongodb'
import { Client } from './Client'
import { Payment } from './Payment'
import { User } from './User'

export interface DocumentType {
  title: string
  code: string
}

export interface Items {
  id: string | ObjectId
  item: string
  description: string
  unit_price: number
  quantity: number
  total: number
}

export interface FiscalDoc {
  id: string
  client: Client
  document: DocumentType
  payment: Payment
  items: Items[]
  receipt_value: number
  reference: string
  serie: string
  emission_reason: string
  changes: number
  hash64: string
  hash4: string
  total: number
  attendant: User
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
