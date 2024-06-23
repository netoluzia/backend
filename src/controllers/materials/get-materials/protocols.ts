import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface IGetStockMaterialsController {
  handle(): Promise<HttpResponse<Stock[]>>
}
export interface IGetStockMaterialsRepository {
  getStockMaterial(): Promise<Stock[]>
}
