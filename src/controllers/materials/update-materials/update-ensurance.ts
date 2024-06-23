import { InsuranceCompany } from '../../../models/Insurance'
import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  IUpdateStockMaterialController,
  IUpdateStockMaterialRepository,
  UpdateStockMaterial,
} from './protocols'

export class UpdateStockMaterialController
  implements IUpdateStockMaterialController
{
  constructor(
    private readonly updateInsuranceRepository: IUpdateStockMaterialRepository
  ) {}
  async handle(
    id: string,
    payload: UpdateStockMaterial
  ): Promise<HttpResponse<Stock>> {
    try {
      const insurance =
        await this.updateInsuranceRepository.updateStockMaterial(id, payload)
      return {
        body: {
          data: insurance,
          status: true,
          message: 'Seguradora atualizada com sucesso',
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          status: false,
          message: 'Seguradora nao foi atualizada',
        },
        statusCode: 500,
      }
    }
  }
}
