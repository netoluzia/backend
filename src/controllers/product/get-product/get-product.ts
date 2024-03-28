import { Product } from '../../../models/Product'
import { HttpResponse } from '../../protocols'
import { IGetProductController, IGetProductRepository } from './protocols'

export class GetProductController implements IGetProductController {
  constructor(private readonly getProductRepository: IGetProductRepository) {}
  async handle(id: string): Promise<HttpResponse<Product>> {
    try {
      const product = await this.getProductRepository.getProduct(id)
      return {
        body: {
          message: 'Operação concluída com sucesso',
          status: true,
          data: product,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Something went wrong',
          status: true,
        },
        statusCode: 500,
      }
    }
  }
}
