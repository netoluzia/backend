import { Product } from '../../../models/Product'
import { MongoDeleteProductRepository } from '../../../repositories/product/delete-product/mongo-delete-product'
import { HttpResponse } from '../../protocols'
import { IDeleteProductController } from './protocols'

export class DeleteProductController implements IDeleteProductController {
  constructor(
    private readonly deleteProductRepository: MongoDeleteProductRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<Product>> {
    try {
      const product = await this.deleteProductRepository.deleteProduct(id)

      return {
        body: {
          message: 'Produto eliminado com sucesso',
          data: product,
          status: true,
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
