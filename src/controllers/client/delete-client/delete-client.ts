import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'
import { IDeleteClientController, IDeleteClientRepository } from './protocols'

export class DeleteClientController implements IDeleteClientController {
  constructor(
    private readonly deleteClientRepository: IDeleteClientRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<Client>> {
    try {
      const client = await this.deleteClientRepository.deleteClient(id)
      return {
        body: {
          data: client,
          message: 'Cliente eliminado com sucesso',
          status: true,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Ocorreu um erro',
          status: true,
        },
        statusCode: 500,
      }
    }
  }
}
