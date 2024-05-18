import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'
import {
  IUpdateProtocol,
  IUpdateProtocolController,
  IUpdateProtocolRepository,
} from './protocols'

export class UpdateProtocolController implements IUpdateProtocolController {
  constructor(private readonly repository: IUpdateProtocolRepository) {}
  async handle(
    id: string,
    payload: IUpdateProtocol
  ): Promise<HttpResponse<Protocol>> {
    try {
      const protocol = await this.repository.updateProtocol(id, payload)
      return {
        body: {
          message: 'Protocolo atualizado com sucesso',
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
