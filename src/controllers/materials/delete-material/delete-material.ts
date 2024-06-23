import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  IDeleteStockMaterialController,
  IDeleteStockMaterialRepository,
} from './protocols'

export class DeleteStockMaterialController
  implements IDeleteStockMaterialController
{
  constructor(
    private readonly deleteInsuranceRepository: IDeleteStockMaterialRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<Stock>> {
    try {
      const insurance =
        await this.deleteInsuranceRepository.deleteStockMaterial(id)

      return {
        body: {
          data: insurance,
          status: true,
          message: 'Seguardaora eliminada com sucesso',
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          status: true,
          message: 'Seguardaora eliminada com sucesso',
        },
        statusCode: 500,
      }
    }
  }
}
