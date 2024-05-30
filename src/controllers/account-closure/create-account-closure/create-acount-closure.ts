import { AccountClosure } from '../../../models/AccountClosure'
import { HttpResponse } from '../../protocols'
import {
  ICreateAccount,
  ICreateAccountClosureController,
  ICreateAccountClosureRepository,
} from './protocol'

export class CreateAccountClosureController
  implements ICreateAccountClosureController
{
  constructor(private readonly repository: ICreateAccountClosureRepository) {}
  async handle(params: ICreateAccount): Promise<HttpResponse<AccountClosure>> {
    try {
      const account = await this.repository.createAccountClosure(params)
      return {
        body: {
          message: 'Operacao bem-sucedida',
          status: true,
          data: account,
        },
        statusCode: 201,
      }
    } catch (error: any) {
      return {
        body: {
          message: error.message,
          status: false,
        },
        statusCode: 409,
      }
    }
  }
}
