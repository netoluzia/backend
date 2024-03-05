import { Service } from '../../../models/Service'
import { HttpResponse } from '../../protocols'
import { IGetServiceController, IGetServiceRepository } from './protocols'

export class GetServiceController implements IGetServiceController {
  constructor(private readonly getServiceRepository: IGetServiceRepository) {}
  async handle(id: string): Promise<HttpResponse<Service>> {
    try {
      const service = await this.getServiceRepository.getService(id)
      return {
        body: {
          message: 'Operação concluída com sucesso',
          status: true,
          data: service,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Something went wrong',
          status: true,
        },
        statusCode: 500,
      }
    }
  }
}
