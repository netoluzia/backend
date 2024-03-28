import { Product } from '../../../models/Product'
import { HttpResponse } from '../../protocols'

export interface IDeleteProductController {
  handle(id: string): Promise<HttpResponse<Product>>
}
export interface IDeleteProductRepository {
  deleteProduct(id: string): Promise<Product>
}
