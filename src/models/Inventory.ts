import { ObjectId } from 'mongodb'

export interface Inventory {
  startBalance: number
  day: number
  month: number
  type: string
  qtd: number
  material: ObjectId
  createdAt: Date
}
