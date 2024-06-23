import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface IGetStockMaterialController {
  handle(id: string): Promise<HttpResponse<Stock>>
}
export interface IGetStockMaterialRepository {
  getStockMaterial(id: string): Promise<Stock>
}
