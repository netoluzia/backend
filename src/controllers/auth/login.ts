import { User } from '../../models/User'
import { HttpResponse } from '../protocols'
import { IGetUserRepository } from '../user/get-user/protocols'
import { Auth, ILoginController, LoginParams } from './protocols'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginController implements ILoginController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  generateToken(user: User): string {
    return jwt.sign({ email: user.email }, 'your_secret_key', {
      expiresIn: '8h',
    })
  }
  async handle(form: LoginParams): Promise<HttpResponse<Auth>> {
    try {
      const { username, password } = form
      const user = await this.getUserRepository.getUser({ username })
      if (!user) {
        return {
          body: {
            message: 'Usuário inválido',
            status: false,
          },
          statusCode: 400,
        }
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return {
          body: {
            message: 'Palavra-passe errada',
            status: false,
          },
          statusCode: 400,
        }
      }

      const token = this.generateToken(user)

      return {
        body: {
          data: { ...user, token },
          message: 'Login feito com sucesso',
          status: true,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Something went wrong',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
