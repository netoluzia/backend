import { User } from '../../../models/User'
import { HttpRequest, HttpResponse } from '../../protocols'
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from './protocols'

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: {
            message: 'Please, specify a body',
            status: false,
          },
        }
      }

      const body = { ...httpRequest.body, createdAt: new Date() }
      const user = await this.createUserRepository.createUser(body)

      return {
        statusCode: 200,
        body: {
          data: user,
          message: 'Usuario criado com sucesso',
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: 'Something went wrong',
          status: false,
        },
      }
    }
  }
}
