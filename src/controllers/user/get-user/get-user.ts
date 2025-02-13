import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'
import {
  IGetUserController,
  IGetUserRepository,
  PayloadParams,
} from './protocols'

export class GetUserController implements IGetUserController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  async getUser(payload: PayloadParams): Promise<HttpResponse<User>> {
    try {
      const user = (await this.getUserRepository.getUser(payload)) as User

      return {
        body: {
          data: user,
          message: 'Operação concluída com sucesso',
          status: true,
        },
        statusCode: 200,
      }
    } catch (error: any) {
      return {
        body: {
          message: error.message,
          status: true,
        },
        statusCode: 500,
      }
    }
  }
}
