import { Stock } from '../../../models/Stock'
import { HttpRequest, HttpResponse } from '../../protocols'
import {
  CreateStockMaterial,
  ICreateStockMaterialController,
  ICreateStockMaterialRepository,
} from './protocols'

export class CreateStockMaterialController
  implements ICreateStockMaterialController
{
  constructor(
    private readonly createStockMaterialRepository: ICreateStockMaterialRepository
  ) {}
  async handle(params: CreateStockMaterial): Promise<HttpResponse<Stock>> {
    try {
      if (!params) {
        return {
          statusCode: 400,
          body: {
            message: 'Bad request',
            status: false,
          },
        }
      }
      const { ...rest } = params
      const service =
        await this.createStockMaterialRepository.createStockMaterial({
          ...rest,
        })

      return {
        statusCode: 200,
        body: {
          data: service,
          message: 'Material criado com sucesso',
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: 'Something went wrong',
          status: false,
        },
      }
    }
  }
}
