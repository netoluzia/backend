import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { CreateAttending, UpdateAttending } from '../create-attending/protocols'

export interface IUpdateAttendingController {
  handle(id: string, params: UpdateAttending): Promise<HttpResponse<Attending>>
}
export interface IUpdateAttendingRepository {
  updateAttending(id: string, params: UpdateAttending): Promise<Attending>
}
