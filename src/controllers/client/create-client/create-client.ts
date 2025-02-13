import { Client } from '../../../models/Client'
import { HttpResponse } from '../../protocols'
import {
  CreateCliente,
  ICreateClientController,
  ICreateClientRepository,
} from './protocols'

export class CreateClientController implements ICreateClientController {
  constructor(
    private readonly createClientRepository: ICreateClientRepository
  ) {}
  async handle(params: CreateCliente): Promise<HttpResponse<Client>> {
    try {
      const { name } = params
      if (!name) {
        return {
          statusCode: 400,
          body: {
            message: 'Missing fields',
            status: false,
          },
        }
      }
      const client = await this.createClientRepository.createClient({
        ...params,
        createdAt: new Date(),
      })
      return {
        statusCode: 200,
        body: {
          data: client,
          status: true,
          message: 'Cliente adicionado com sucesso',
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
