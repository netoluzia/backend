import { HttpResponse } from '../../protocols'
import {
  IGetAccountClosuresController,
  IGetAccountClosuresRepository,
} from './protocol'

export class GetAccountClosuresController
  implements IGetAccountClosuresController
{
  constructor(private readonly repository: IGetAccountClosuresRepository) {}
  async handle(range: string): Promise<HttpResponse<any>> {
    try {
      const account = await this.repository.getAccountClosures(range)
      return {
        body: {
          message: 'Sucesso',
          status: true,
          data: account,
        },
        statusCode: 200,
      }
    } catch (error: any) {
      return {
        body: {
          status: false,
          message: error.message,
        },
        statusCode: 500,
      }
    }
  }
}
