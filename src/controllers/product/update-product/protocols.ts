import { Product } from '../../../models/Product'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface IUpdateProductRepository {
  updateProduct(id: string, updateProduct: Product): Promise<Product>
}

export interface IUpdateProductController {
  handle(payload: HttpRequest<Product>): Promise<HttpResponse<Product>>
}
