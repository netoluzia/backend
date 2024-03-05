import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'
import { IGetServicesController, IGetServicesRepository } from './protocols'

export class GetServicesController implements IGetServicesController {
  constructor(private readonly getServicesRepository: IGetServicesRepository) {}
  async handle(params: string): Promise<HttpResponse<Service[]>> {
    try {
      const type = params || 'service'
      const services = await this.getServicesRepository.getServices(type)
      return {
        statusCode: 200,
        body: {
          data: services,
          message: 'Items carregados com sucesso',
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          status: false,
          message: 'Something went wrong',
        },
      }
    }
  }
}
