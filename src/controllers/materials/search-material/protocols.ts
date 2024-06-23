import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface ISearchStockMaterialsController {
  handle(name: string): Promise<HttpResponse<Stock[]>>
}
export interface ISearchStockMaterialsRepository {
  searchStockMaterial(name: string): Promise<Stock[]>
}
