import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'

export interface IUpdateProtocol {
  name?: string
  value?: number
}

export interface IUpdateProtocolController {
  handle(id: string, payload: IUpdateProtocol): Promise<HttpResponse<Protocol>>
}
export interface IUpdateProtocolRepository {
  updateProtocol(id: string, payload: IUpdateProtocol): Promise<Protocol>
}
