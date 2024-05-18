import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'

export interface IDeleteProtocolController {
  handle(id: string): Promise<HttpResponse<Protocol>>
}
export interface IDeleteProtocolRepository {
  deleteProtocol(id: string): Promise<Protocol>
}
