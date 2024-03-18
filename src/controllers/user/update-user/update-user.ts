import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateParams,
} from './protocols'

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(id: string, payload: UpdateParams): Promise<HttpResponse<User>> {
    try {
      const user = await this.updateUserRepository.update(id, payload)
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
