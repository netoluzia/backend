import { AccountClosure, Speciality } from '../../../models/AccountClosure'
import { HttpResponse } from '../../protocols'

export interface ICreateAccount {
  id: string
  day: string
  month: string
  type: string
  specialities: Speciality[]
}

export interface ICreateAccountClosureRepository {
  createAccountClosure(params: ICreateAccount): Promise<AccountClosure>
}
export interface ICreateAccountClosureController {
  handle(params: ICreateAccount): Promise<HttpResponse<AccountClosure>>
}
