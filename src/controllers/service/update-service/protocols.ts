import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'
import { createServiceParams } from '../create-service/protocols'

export interface IUpdateServiceRepository {
  updateService(
    id: string,
    updateService: createServiceParams
  ): Promise<Service>
}

export interface IUpdateServiceController {
  handle(
    payload: HttpRequest<createServiceParams>
  ): Promise<HttpResponse<Service>>
}
