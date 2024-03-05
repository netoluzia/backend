import { Service } from '../../../models/Service'
import { HttpResponse } from '../../protocols'

export interface IDeleteServiceController {
  handle(id: string): Promise<HttpResponse<Service>>
}
export interface IDeleteServiceRepository {
  deleteService(id: string): Promise<Service>
}
