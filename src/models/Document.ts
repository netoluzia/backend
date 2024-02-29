import { Client } from './Client'
import { Payment } from './Payment'
import { User } from './User'

export interface DocumentType {
  title: string
  code: string
}

export interface Items {
  id: string
  item: string
  description: string
  unit_price: number
  quantity: number
  total: number
}

export interface Document {
  id: string
  client: Client
  document: DocumentType
  payment: Payment
  items: Items[]
  receipt_value: number
  refernce: string
  emission_reason: string
  changes: number
  attendant: User
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
