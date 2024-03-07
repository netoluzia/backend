import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'

export interface IDeleteClientController {
  handle(id: string): Promise<HttpResponse<Client>>
}
export interface IDeleteClientRepository {
  deleteClient(id: string): Promise<Client>
}
