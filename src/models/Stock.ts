export interface Stock {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  min_quantity: number
  unity: string
  startQuantity: number
  category: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
