import { Product } from '../../../models/Product'
import { HttpRequest, HttpResponse } from '../../protocols'
import { IUpdateProductController, IUpdateProductRepository } from './protocols'

export class UpdateProductController implements IUpdateProductController {
  constructor(
    private readonly updateProductRepository: IUpdateProductRepository
  ) {}
  async handle(payload: HttpRequest<Product>): Promise<HttpResponse<Product>> {
    try {
      const { body, params } = payload
      if (!params || !body) {
        return {
          statusCode: 400,
          body: {
            message: 'Bad request',
            status: false,
          },
        }
      }

      const service = await this.updateProductRepository.updateProduct(params, {
        ...body,
        updatedAt: new Date(),
      })

      return {
        statusCode: 200,
        body: {
          message: 'Item atualizado com sucesso',
          data: service,
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
