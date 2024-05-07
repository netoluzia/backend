import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'
import { CreateCliente } from '../create-client/protocols'
import { IUpdateClientController, IUpdateClientRepository } from './protocols'

export class UpdateClientController implements IUpdateClientController {
  constructor(
    private readonly updateClientRepository: IUpdateClientRepository
  ) {}
  async handle(
    id: string,
    params: CreateCliente
  ): Promise<HttpResponse<Client>> {
    try {
      const client = await this.updateClientRepository.updateClient(id, params)
      return {
        statusCode: 200,
        body: {
          data: client,
          message: 'Cliente modificado com sucesso',
          status: true,
        },
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: {
          message: error.message,
          status: false,
        },
      }
    }
  }
}
