import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'

export interface IGetClientController {
  handle(id: string): Promise<HttpResponse<Client>>
}
export interface IGetClientRepository {
  getClient(id: string): Promise<Client>
}
