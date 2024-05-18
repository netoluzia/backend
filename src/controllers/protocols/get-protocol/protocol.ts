import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'

export interface IGetProtocolController {
  handle(id: string): Promise<HttpResponse<Protocol>>
}
export interface IGetProtocolRepository {
  getProtocol(id: string): Promise<Protocol>
}
