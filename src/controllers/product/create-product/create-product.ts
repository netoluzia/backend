import { Product } from '../../../models/Product'
import { HttpRequest, HttpResponse } from '../../protocols'
import { ICreateProductController, ICreateProductRepository } from './protocols'

export class CreateProductController implements ICreateProductController {
  constructor(
    private readonly createProductRepository: ICreateProductRepository
  ) {}
  async handle(params: HttpRequest<Product>): Promise<HttpResponse<Product>> {
    try {
      const { body } = params
      if (!body) {
        return {
          statusCode: 400,
          body: {
            message: 'Bad request',
            status: false,
          },
        }
      }

      console.log(body)

      const product = await this.createProductRepository.createProduct({
        ...body,
      })

      return {
        statusCode: 200,
        body: {
          data: product,
          message: 'Produto criado com sucesso',
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
