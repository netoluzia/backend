import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface CreateStockMaterial {
  name: string
  description: string
  price: number
  quantity: number
  category: string
  min_quantity: number
}

export interface ICreateStockMaterialRepository {
  createStockMaterial(params: CreateStockMaterial): Promise<Stock>
}
export interface ICreateStockMaterialController {
  handle(params: CreateStockMaterial): Promise<HttpResponse<Stock>>
}
