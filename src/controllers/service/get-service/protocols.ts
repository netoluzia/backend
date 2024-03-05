import { Service } from '../../../models/Service'
import { HttpResponse } from '../../protocols'

export interface IGetServiceController {
  handle(id: string): Promise<HttpResponse<Service>>
}
export interface IGetServiceRepository {
  getService(id: string): Promise<Service>
}
