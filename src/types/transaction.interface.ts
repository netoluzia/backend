import { Transaction } from '@prisma/client'
import { HttpResponse } from './global.interfaces'

export interface ITransactionController {
  addStock(id: string, amount: number): Promise<HttpResponse<Transaction>>
  subtractStock(id: string, amount: number): Promise<HttpResponse<Transaction>>
  reportMonthly(month: number, year: number): Promise<HttpResponse<any>>
}

export interface ITransactionRepository {
  addStock(id: string, amount: number): Promise<Transaction>
  subtractStock(id: string, amount: number): Promise<Transaction>
  reportMonthly(month: number, year: number): Promise<any>
}
