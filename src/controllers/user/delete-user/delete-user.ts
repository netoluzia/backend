import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'
import { IDeleteUserController, IDeleteUserRepository } from './protocols'

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(id: string): Promise<HttpResponse<User>> {
    try {
      const user = await this.deleteUserRepository.deleteUser(id)
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
