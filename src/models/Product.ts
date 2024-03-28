export interface Product {
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
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
