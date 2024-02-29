import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'

export interface IGetClientsRepository {
  getClients(): Promise<Client[]>
}
export interface IGetClientsController {
  handle(): Promise<HttpResponse<Client[]>>
}
