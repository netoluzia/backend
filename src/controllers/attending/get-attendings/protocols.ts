import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'

export interface IGetAtendingsController {
  handle(): Promise<HttpResponse<Attending | any>>
}
export interface IGetAtendingsRepository {
  getAttendings(): Promise<Attending | any>
}
