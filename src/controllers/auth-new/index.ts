import { User } from '@prisma/client'
import {
  HttpResponse,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import { TLogin } from '../../validator/auth.validator'
import { prisma } from '../../database/prisma'
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/token'

export class AuthController {
  async login(
    payload: TLogin
  ): Promise<HttpResponse<User & { token: string }>> {
    try {
      const { username, password } = payload
      const user = await prisma.user.findUnique({ where: { username } })
      if (!user) {
        return {
          status: StatusCode.UNAUTHORIZED,
          message: Message.UNKNOWN_USER,
          success: false,
        }
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return {
          message: Message.WRONG_PWD,
          status: StatusCode.UNAUTHORIZED,
          success: false,
        }
      }

      const token = generateToken(user)

      return {
        message: Message.LOGIN_SUCCEED,
        status: StatusCode.OK,
        success: true,
        body: {
          data: { ...user, token },
        },
      }
    } catch (error) {
      return {
        message: Message.INTERNAL_ERROR,
        status: StatusCode.SERVER_ERROR,
        success: false,
      }
    }
  }
}
