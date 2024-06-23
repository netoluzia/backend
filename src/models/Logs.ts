import { ObjectId } from 'mongodb'

export interface Logs {
  id: string
  idMaterial: ObjectId
  quantity: number
  type: string
  stockFinal?: number
  stockInitial?: number
  createdAt: Date
}
