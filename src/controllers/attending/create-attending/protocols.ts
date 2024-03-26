import type { ObjectId } from 'mongodb'
import { Attending, ItemsAttendance } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { Items } from '../../../models/Document'

export interface CreateAttending {
  client?: ObjectId
  attendant?: ObjectId
  itemsAttendant: ItemsAttendance
}

export interface Exam {
  id: string
  title: string
  result: TestResult
}

export interface Patient {
  name: string
  birthday: Date
  gender: 'M' | 'F'
  phone_number?: string
  address?: string
  symptoms?: {
    fever: boolean
    spew: boolean
  }
  exams?: Exam[]
  observation?: string
}

export interface CreatingAttending {
  attendant?: ObjectId
  client?: ObjectId
  patient?: Patient
  trial_incharge?: string
  doctor?: ObjectId
  analyst?: ObjectId
  status: 'to-trial' | 'to-doctor-1' | 'to-lab' | 'to-doctor-2'
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
  handle(params: CreatingAttending): Promise<HttpResponse<Attending>>
}
export interface ICreateAttendingRepository {
  createAttending(params: CreatingAttending): Promise<Attending>
}
export { HttpResponse }
