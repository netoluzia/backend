import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'
import { IGetProtocolController, IGetProtocolRepository } from './protocol'

export class GetProtocol implements IGetProtocolController {
  constructor(private readonly repository: IGetProtocolRepository) {}
  async handle(id: string): Promise<HttpResponse<Protocol>> {
    try {
      const protocol = await this.repository.getProtocol(id)
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
