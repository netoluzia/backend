import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'
import { IGetUserController, IGetUsersRepository } from './protocols'

export class GetUsersController implements IGetUserController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<Omit<User, 'password'>[]>> {
    try {
      const users = await this.getUsersRepository.getUsers()
      return {
        statusCode: 200,
        body: {
          data: users,
          message: 'Usuários carregados com sucesso',
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 200,
        body: {
          message: 'Something went wrong',
          status: false,
        },
      }
    }
  }
}
