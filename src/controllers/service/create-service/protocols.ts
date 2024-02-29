import { Service, servicesType } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface createServiceParams {
  title: string
  description: string
  net_price: number
  price: number
  category: string
  quantity: number
  stock: number
  iva: boolean
  discount: number
  type: servicesType
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateServicesRepository {
  createService(params: createServiceParams): Promise<Service>
}
export interface ICreateServiceController {
  handle(
    params: HttpRequest<createServiceParams>
  ): Promise<HttpResponse<Service>>
}
