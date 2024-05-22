import { AccountClosure } from '../../../models/AccountClosure'
import { HttpResponse } from '../../protocols'

export interface ICreateAccountClosureRepository {
  createAccountClosure(): Promise<AccountClosure>
}
export interface ICreateAccountClosureController {
  handle(): Promise<HttpResponse<AccountClosure>>
}
