import { Product } from '../../../models/Product'
import { HttpResponse } from '../../protocols'
import { IGetProductsController, IGetProductsRepository } from './protocols'

export class GetProductsController implements IGetProductsController {
  constructor(private readonly getProductsRepository: IGetProductsRepository) {}
  async handle(params: string): Promise<HttpResponse<Product[]>> {
    try {
      console.log('Hey')
      const products = await this.getProductsRepository.getProducts(params)
      return {
        statusCode: 200,
        body: {
          data: products,
          message: 'Items carregados com sucesso',
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          status: false,
          message: 'Something went wrong',
        },
      }
    }
  }
}
