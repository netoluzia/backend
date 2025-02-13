import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'
import {
  ICreateServiceController,
  ICreateServicesRepository,
} from './protocols'

export class CreateServiceController implements ICreateServiceController {
  constructor(
    private readonly createServiceRepository: ICreateServicesRepository
  ) {}
  async handle(params: HttpRequest<Service>): Promise<HttpResponse<Service>> {
    try {
      const { body } = params
      if (!body) {
        return {
          statusCode: 400,
          body: {
            message: 'Bad request',
            status: false,
          },
        }
      }

      const service = await this.createServiceRepository.createService({
        ...body,
        createdAt: new Date(),
      })

      return {
        statusCode: 200,
        body: {
          data: service,
          message: 'Servico criado com sucesso',
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: 'Something went wrong',
          status: false,
        },
      }
    }
  }
}
