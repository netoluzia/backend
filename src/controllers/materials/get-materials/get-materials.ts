import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  IGetStockMaterialsController,
  IGetStockMaterialsRepository,
} from './protocols'

export class GetStockMaterialsController
  implements IGetStockMaterialsController
{
  constructor(
    private readonly getInsurancesRepository: IGetStockMaterialsRepository
  ) {}
  async handle(): Promise<HttpResponse<Stock[]>> {
    try {
      const insurances = await this.getInsurancesRepository.getStockMaterial()
      return {
        body: {
          message: 'Materiais carregados com sucesso',
          status: true,
          data: insurances,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Ocorreu um erro',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
