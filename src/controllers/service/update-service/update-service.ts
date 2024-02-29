import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'
import { createServiceParams } from '../create-service/protocols'
import { IUpdateServiceController, IUpdateServiceRepository } from './protocols'

export class UpdateServiceController implements IUpdateServiceController {
  constructor(
    private readonly updateServiceRepository: IUpdateServiceRepository
  ) {}
  async handle(
    payload: HttpRequest<createServiceParams>
  ): Promise<HttpResponse<Service>> {
    try {
      const { body, params } = payload
      if (!params || !body) {
        return {
          statusCode: 400,
          body: 'Bad request',
        }
      }

      const service = await this.updateServiceRepository.updateService(params, {
        ...body,
        updatedAt: new Date(),
      })

      return {
        statusCode: 200,
        body: service,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      }
    }
  }
}
