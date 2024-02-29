import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface IGetServicesRepository {
  getServices(type: string): Promise<Service[]>
}
export interface IGetServicesController {
  handle(params: string): Promise<HttpResponse<Service[]>>
}
