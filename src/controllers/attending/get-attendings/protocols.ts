import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'

export interface IGetAtendingsController {
  handle(status: string): Promise<HttpResponse<Attending | any>>
}
export interface IGetAtendingsRepository {
  getAttendings(status: string): Promise<Attending | any>
}
