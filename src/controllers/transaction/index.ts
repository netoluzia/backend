import { Transaction } from '@prisma/client'
import {
  HttpResponse,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import {
  ITransactionController,
  ITransactionRepository,
} from '../../types/transaction.interface'

export class TransactionController implements ITransactionController {
  constructor(private readonly repository: ITransactionRepository) {}
  async addStock(
    id: string,
    amount: number
  ): Promise<HttpResponse<Transaction>> {
    try {
      const response = await this.repository.addStock(id, amount)
      return {
        message: Message.OK,
        body: { data: response },
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async subtractStock(
    id: string,
    amount: number
  ): Promise<HttpResponse<Transaction>> {
    try {
      const response = await this.repository.subtractStock(id, amount)
      return {
        message: Message.OK,
        body: { data: response },
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async reportMonthly(month: number, year: number): Promise<HttpResponse<any>> {
    try {
      const response = await this.repository.reportMonthly(month, year)
      return {
        message: Message.OK,
        body: { data: response },
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
}
