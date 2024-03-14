import { User } from '../../../models/User'
import { HttpRequest, HttpResponse } from '../../protocols'
import { IGetUserRepository } from '../get-user/protocols'
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from './protocols'
import bcrypt from 'bcrypt'

export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getUserRepository: IGetUserRepository
  ) {}

  generateRandomString(length: number) {
    return [...Array(length)]
      .map(() =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
          Math.floor(Math.random() * 62)
        )
      )
      .join('')
  }

  // Exemplo de uso da função para gerar uma string aleatória com 3 caracteres

  removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  generate(name: string): string {
    let nameClean = this.removeAccents(name).toLowerCase()
    let nameParts = nameClean.split(' ')
    let firstName = nameParts[0]
    let lastName = nameParts[nameParts.length - 1]
    let username = '$' + firstName + '.' + lastName

    return username
  }
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
      const { body } = httpRequest
      const { name, email } = body
      const { username: auxUsername, password, ...rest } = body
      const userEmail = await this.getUserRepository.getUser({ email })
      if (userEmail) {
        return {
          body: {
            message: 'Este email já está registrado. Tente outro',
            status: false,
          },
          statusCode: 204,
        }
      }

      let username: string
      let userName = null
      let count = 0
      do {
        username = this.generate(
          count > 0 ? name : name + this.generateRandomString(count)
        )
        userName = await this.getUserRepository.getUser({ username })
        count += 1
      } while (userName)

      const hashPawword = await bcrypt.hash(password, 10)
      const user = await this.createUserRepository.createUser({
        username: username,
        password: hashPawword,
        ...rest,
      })

      return {
        statusCode: 200,
        body: {
          data: user,
          message: 'Usuario criado com sucesso',
          status: true,
        },
      }
    } catch (error: any) {
      console.log(error)
      return {
        statusCode: 500,
        body: {
          message: error.message,
          status: false,
        },
      }
    }
  }
}
