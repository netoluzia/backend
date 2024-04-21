import { ObjectId } from 'mongodb'
import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'

export interface CreateCliente {
  name: string
  nif?: string
  email?: string
  phone_number?: string
  insurance_company?: ObjectId
  insurance_number?: string
  createdAt: Date
  deletedAt: Date
}

export interface ICreateClientRepository {
  createClient(params: CreateCliente): Promise<Client>
}

export interface ICreateClientController {
  handle(params: CreateCliente): Promise<HttpResponse<Client>>
}
