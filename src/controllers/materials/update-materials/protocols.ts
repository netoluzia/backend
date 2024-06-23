import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface UpdateStockMaterial {
  name?: string
  description?: string
  price?: number
  quantity?: number
  min_quantity?: number
}

export interface IUpdateStockMaterialController {
  handle(id: string, payload: UpdateStockMaterial): Promise<HttpResponse<Stock>>
}
export interface IUpdateStockMaterialRepository {
  updateStockMaterial(id: string, payload: UpdateStockMaterial): Promise<Stock>
}
