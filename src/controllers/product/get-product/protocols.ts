import { Product } from '../../../models/Product'
import { HttpResponse } from '../../protocols'

export interface IGetProductController {
  handle(id: string): Promise<HttpResponse<Product>>
}
export interface IGetProductRepository {
  getProduct(id: string): Promise<Product>
}
