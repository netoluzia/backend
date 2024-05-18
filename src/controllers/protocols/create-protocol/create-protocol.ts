import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'
import {
  ICreateProtocol,
  ICreateProtocolController,
  ICreateProtocolRepository,
} from './protocols'

export class CreateProtocolController implements ICreateProtocolController {
  constructor(private readonly repository: ICreateProtocolRepository) {}
  async handle(payload: ICreateProtocol): Promise<HttpResponse<Protocol>> {
    try {
      const protocol = await this.repository.createProtocol(payload)
      return {
        body: {
          message: 'Protocolo salvo com sucesso',
          status: true,
          data: protocol,
        },
        statusCode: 201,
      }
    } catch (error: any) {
      return {
        body: {
          message: error.message,
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
