import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'

export interface IGetAttendingRepository {
  getAttending(id: string): Promise<Attending | any>
}
export interface IGetAttendingController {
  handle(id: string): Promise<HttpResponse<Attending | any>>
}
