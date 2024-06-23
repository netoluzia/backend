import { ObjectId } from 'mongodb'
import { Material } from '../controllers/service/attach-material/protocols'

export enum servicesType {
  SERVICE = 'service',
  PRODUCT = 'product',
}

export interface Service {
  id: string
  title: string
  description: string
  net_price: number
  price: number
  category: string
  quantity: number
  stock: number
  iva: boolean
  discount: number
  material: { material: ObjectId; qtd: number }[]
  type: servicesType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
