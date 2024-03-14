import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'

export interface IGetUserController {
  handle(): Promise<HttpResponse<Omit<User, 'password'>[]>>
}

export interface IGetUsersRepository {
  getUsers(): Promise<Omit<User, 'password'>[]>
}
