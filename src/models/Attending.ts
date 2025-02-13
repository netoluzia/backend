import { ObjectId } from 'mongodb'
import { Items } from './Document'
import { User } from './User'

export interface ItemsAttendance {
  items: Items[]
  payment: string
  date: Date
}

export interface Attending {
  id: string
  client: ObjectId
  doctor: ObjectId
  analyst: ObjectId
  nurse: ObjectId
  attendant: ObjectId
  createdAt: Date
  updatedAt: Date
}
