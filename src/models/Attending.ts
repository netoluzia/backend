import { ObjectId } from 'mongodb'
import { Items } from './Document'
import { User } from './User'

export interface Attending {
  id: string
  client: ObjectId
  doctor: ObjectId
  analyst: ObjectId
  nurse: ObjectId
  attendant: ObjectId
  itemsAttendant: Items[]
  itemsNurse: Items[]
  itemsDoctor: Items[]
  itemsAnalyst: Items[]
  createdAt: Date
  updatedAt: Date
}
