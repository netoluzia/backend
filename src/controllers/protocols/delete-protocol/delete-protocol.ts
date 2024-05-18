import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'
import {
  IDeleteProtocolController,
  IDeleteProtocolRepository,
} from './protocol'

export class GetProtocols implements IDeleteProtocolController {
  constructor(private readonly repository: IDeleteProtocolRepository) {}
  async handle(id: string): Promise<HttpResponse<Protocol>> {
    try {
      const protocol = await this.repository.deleteProtocol(id)
      return {
        body: {
          message: 'Operacao realizada com sucesso',
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
