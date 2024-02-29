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
  type: servicesType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
