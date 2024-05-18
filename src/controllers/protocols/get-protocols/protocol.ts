import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'

export interface IGetProtocolsController {
  handle(): Promise<HttpResponse<Protocol[]>>
}
export interface IGetProtocolsRepository {
  getProtocols(): Promise<Protocol[]>
}
