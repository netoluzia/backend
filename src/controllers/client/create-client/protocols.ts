import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'

export interface CreateCliente {
  name: string
  nif?: string
  email?: string
  phone_number?: string
  insurance_company?: string
  insurance_number?: string
  createdAt: Date
}

export interface ICreateClientRepository {
  createClient(params: CreateCliente): Promise<Client>
}

export interface ICreateClientController {
  handle(params: CreateCliente): Promise<HttpResponse<Client>>
}
