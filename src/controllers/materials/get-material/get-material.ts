import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  IGetStockMaterialController,
  IGetStockMaterialRepository,
} from './protocols'

export class GetStockMaterialController implements IGetStockMaterialController {
  constructor(
    private readonly getInsuranceRepository: IGetStockMaterialRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<Stock>> {
    try {
      const insurance = await this.getInsuranceRepository.getStockMaterial(id)
      return {
        body: {
          message: 'Operacao concluida com sucesso',
          status: true,
          data: insurance,
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
