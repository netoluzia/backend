import { AccountClosure } from '../../../models/AccountClosure'
import { HttpResponse } from '../../protocols'

export interface IGetAccountClosuresRepository {
  getAccountClosures(range: string): Promise<AccountClosure[] | any[]>
}
export interface IGetAccountClosuresController {
  handle(range: string): Promise<HttpResponse<AccountClosure[] | any>>
}
