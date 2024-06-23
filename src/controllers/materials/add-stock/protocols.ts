import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'

export interface IAddStockParams {
  material: string
  quantity: number
  type: string
  stockInitial?: number
  stockFinal?: number
}

export interface IAddStockRepository {
  addStock(params: IAddStockParams): Promise<Stock>
}

export interface IAddStockController {
  handle(params: IAddStockParams): Promise<HttpResponse<Stock>>
}
