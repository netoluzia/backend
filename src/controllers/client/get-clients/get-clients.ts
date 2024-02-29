import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'
import { IGetClientsController, IGetClientsRepository } from './protocols'

export class GetClientsController implements IGetClientsController {
  constructor(private readonly getClientsRepository: IGetClientsRepository) {}
  async handle(): Promise<HttpResponse<Client[]>> {
    try {
      const clients = await this.getClientsRepository.getClients()
      return {
        statusCode: 200,
        body: clients,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      }
    }
  }
}
