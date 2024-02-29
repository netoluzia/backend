import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'
import { CreateCliente } from '../create-client/protocols'

export interface IUpdateClientController {
  handle(id: string, params: CreateCliente): Promise<HttpResponse<Client>>
}
export interface IUpdateClientRepository {
  updateClient(id: string, params: CreateCliente): Promise<Client>
}
