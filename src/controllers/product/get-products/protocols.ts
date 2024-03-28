import { Product } from '../../../models/Product'
import { HttpResponse } from '../../protocols'

export interface IGetProductsRepository {
  getProducts(type: string): Promise<Product[]>
}
export interface IGetProductsController {
  handle(params: string): Promise<HttpResponse<Product[]>>
}
