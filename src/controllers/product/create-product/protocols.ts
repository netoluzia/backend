import { Product } from '../../../models/Product'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface createProductParams {
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
}

export interface ICreateProductRepository {
  createProduct(params: createProductParams): Promise<Product>
}
export interface ICreateProductController {
  handle(
    params: HttpRequest<createProductParams>
  ): Promise<HttpResponse<Product>>
}
