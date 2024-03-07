import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'
import { IGetClientController, IGetClientRepository } from './protocols'

export class GetClientController implements IGetClientController {
  constructor(private readonly getClientRepository: IGetClientRepository) {}
  async handle(id: string): Promise<HttpResponse<Client>> {
    try {
      const client = await this.getClientRepository.getClient(id)
      return {
        body: {
          message: 'Operacao realizada com sucesso',
          status: true,
          data: client,
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
