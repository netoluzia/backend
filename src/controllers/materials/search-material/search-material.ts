import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  ISearchStockMaterialsController,
  ISearchStockMaterialsRepository,
} from './protocols'

export class SearchStockMaterial implements ISearchStockMaterialsController {
  constructor(
    private readonly searchStockMaterialRepository: ISearchStockMaterialsRepository
  ) {}
  async handle(name: string): Promise<HttpResponse<Stock[]>> {
    try {
      const materials =
        await this.searchStockMaterialRepository.searchStockMaterial(name)
      return {
        body: {
          message: 'Materiais carregados com sucesso',
          status: true,
          data: materials,
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
