import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { CreateAttending } from '../create-attending/protocols'

export interface IUpdateAttendingController {
  handle(id: string, params: CreateAttending): Promise<HttpResponse<Attending>>
}
export interface IUpdateAttendingRepository {
  updateAttending(id: string, params: CreateAttending): Promise<Attending>
}
