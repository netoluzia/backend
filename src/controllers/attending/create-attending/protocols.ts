import type { ObjectId } from 'mongodb'
import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { Items } from '../../../models/Document'

export interface CreateAttending {
  client?: ObjectId
  attendant?: ObjectId
  doctor?: ObjectId
  analyst?: ObjectId
  nurse?: ObjectId
  items?: Items[]
}
export interface ICreateAttendingController {
  handle(params: CreateAttending): Promise<HttpResponse<Attending>>
}
export interface ICreateAttendingRepository {
  createAttending(params: CreateAttending): Promise<Attending>
}
export { HttpResponse }
