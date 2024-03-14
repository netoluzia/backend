import { User } from '../../../models/User'
import { HttpResponse } from '../../protocols'

export interface PayloadParams {
  id?: string
  username?: string
  email?: string
}
export interface IGetUserRepository {
  getUser(payload: PayloadParams): Promise<User | null>
}

export interface IGetUserController {
  getUser(payload: PayloadParams): Promise<HttpResponse<User>>
}
