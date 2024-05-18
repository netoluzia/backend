import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'

export interface ICreateProtocol {
  name: string
  value: number
}

export interface ICreateProtocolController {
  handle(payload: ICreateProtocol): Promise<HttpResponse<Protocol>>
}
export interface ICreateProtocolRepository {
  createProtocol(payload: ICreateProtocol): Promise<Protocol>
}
