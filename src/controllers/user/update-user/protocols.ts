import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'

export interface UpdateParams {
  email: string
  phone_number: string
  name: string
  role: string
}

export interface IUpdateUserController {
  handle(id: string, payload: UpdateParams): Promise<HttpResponse<User>>
}
export interface IUpdateUserRepository {
  update(id: string, payload: UpdateParams): Promise<User>
}
