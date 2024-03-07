import { Service } from '../../../models/Service'
import { MongoDeleteServiceRepository } from '../../../repositories/service/delete-service/mongo-delete-service'
import { HttpResponse } from '../../protocols'
import { IDeleteServiceController } from './protocols'

export class DeleteServiceController implements IDeleteServiceController {
  constructor(
    private readonly deleteServiceRepository: MongoDeleteServiceRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<Service>> {
    try {
      const service = await this.deleteServiceRepository.deleteService(id)

      return {
        body: {
          message: 'Serviço eliminado com sucesso',
          data: service,
          status: true,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Ocorreu um erro',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
