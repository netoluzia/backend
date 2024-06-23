import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  IAddStockController,
  IAddStockParams,
  IAddStockRepository,
} from './protocols'

export class AddStockController implements IAddStockController {
  constructor(private readonly repository: IAddStockRepository) {}
  async handle(params: IAddStockParams): Promise<HttpResponse<Stock>> {
    try {
      const stock = await this.repository.addStock(params)
      return {
        body: {
          message: 'Operacao concluida com sucesso',
          status: true,
          data: stock,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Operacao concluida com erros',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
