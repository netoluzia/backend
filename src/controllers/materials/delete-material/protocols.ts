import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface IDeleteStockMaterialController {
  handle(id: string): Promise<HttpResponse<Stock>>
}
export interface IDeleteStockMaterialRepository {
  deleteStockMaterial(id: string): Promise<Stock>
}
