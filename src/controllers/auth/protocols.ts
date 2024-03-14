import { User } from '../../models/User'
import { HttpResponse } from '../protocols'

export interface LoginParams {
  username: string
  password: string
}

export interface Token {
  token: string
}

export type Auth = User & Token
export interface ILoginRepository {
  login(): Promise<User>
}
export interface ILoginController {
  handle(form: LoginParams): Promise<HttpResponse<Auth>>
}
