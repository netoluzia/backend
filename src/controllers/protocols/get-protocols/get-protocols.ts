import { Protocol } from '../../../models/Protocol'
import { HttpResponse } from '../../protocols'
import { IGetProtocolsController, IGetProtocolsRepository } from './protocol'

export class GetProtocols implements IGetProtocolsController {
  constructor(private readonly repository: IGetProtocolsRepository) {}
  async handle(): Promise<HttpResponse<Protocol[]>> {
    try {
      const protocols = await this.repository.getProtocols()
      return {
        body: {
          message: 'Operacao realizada com sucesso',
          status: true,
          data: protocols,
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
