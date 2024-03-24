import type { ObjectId } from 'mongodb'
import { Attending, ItemsAttendance } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { Items } from '../../../models/Document'

export interface CreateAttending {
  client?: ObjectId
  attendant?: ObjectId
  itemsAttendant: ItemsAttendance
}

export interface TestResult {
  name: string
  result: string
}

export interface UpdateAttending {
  doctor?: ObjectId
  itemsDoctor?: {
    items: Items[]
    description: string
  }
  analyst?: ObjectId
  itemsAnalyst?: {
    description: string
    result: TestResult[]
  }
  nurse?: ObjectId
}
export interface ICreateAttendingController {
  handle(params: CreateAttending): Promise<HttpResponse<Attending>>
}
export interface ICreateAttendingRepository {
  createAttending(params: CreateAttending): Promise<Attending>
}
export { HttpResponse }
