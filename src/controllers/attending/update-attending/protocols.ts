import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import {
  CreateAttending,
  CreatingAttending,
  UpdateAttending,
} from '../create-attending/protocols'

export interface IUpdateAttendingController {
  handle(
    id: string,
    params: CreatingAttending
  ): Promise<HttpResponse<Attending>>
}
export interface IUpdateAttendingRepository {
  updateAttending(id: string, params: CreatingAttending): Promise<Attending>
}
