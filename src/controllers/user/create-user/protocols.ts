import { User } from '../../../models/User'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>
}

export interface CreateUserParams {
  name: string
  email: string
  password: string
  createdAt: Date
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>
}
