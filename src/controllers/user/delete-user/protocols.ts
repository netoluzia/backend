import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'

export interface IDeleteUserController {
  handle(id: string): Promise<HttpResponse<User>>
}
export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>
}
