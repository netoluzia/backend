import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'
import {
  IAttachMaterialServiceController,
  IAttachMaterialServiceRepository,
  Material,
} from './protocols'

export class AttachMaterialController
  implements IAttachMaterialServiceController
{
  constructor(private readonly repository: IAttachMaterialServiceRepository) {}
  async handle(
    payload: HttpRequest<Material[]>
  ): Promise<HttpResponse<Service>> {
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

      const service = await this.repository.attachMaterial(params.id, body)

      return {
        statusCode: 200,
        body: {
          message: 'Item atualizado com sucesso',
          data: service,
          status: true,
        },
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: {
          message: error.message,
          status: false,
        },
      }
    }
  }
}
