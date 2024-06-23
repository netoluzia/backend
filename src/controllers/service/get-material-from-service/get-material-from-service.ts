import { Stock } from '../../../models/Stock'
import { HttpResponse } from '../../protocols'
import {
  IGetMaterialFromServiceController,
  IGetMaterialFromServiceRepository,
} from './protocols'

export class GetMaterialFromService
  implements IGetMaterialFromServiceController
{
  constructor(private readonly repository: IGetMaterialFromServiceRepository) {}
  async handle(id: string): Promise<HttpResponse<Stock>> {
    try {
      const material = await this.repository.getMaterialFromService(id)
      return {
        body: {
          message: 'Operação concluída com sucesso',
          status: true,
          data: material,
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
