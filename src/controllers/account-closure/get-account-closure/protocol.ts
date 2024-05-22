import { AccountClosure } from '../../../models/AccountClosure'
import { HttpResponse } from '../../protocols'

export interface IGetAccountClosureRepository {
  getAccountClosure(range: string): Promise<AccountClosure>
}
export interface IGetAccountClosureController {
  handle(range: string): Promise<HttpResponse<AccountClosure>>
}
