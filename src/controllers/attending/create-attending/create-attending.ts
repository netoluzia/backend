import { Attending } from '../../../models/Attending'
import { HttpResponse } from './protocols'
import {
  CreateAttending,
  ICreateAttendingController,
  ICreateAttendingRepository,
} from './protocols'

export class CreateAttendingController implements ICreateAttendingController {
  constructor(
    private readonly createAttendingRepository: ICreateAttendingRepository
  ) {}
  async handle(params: CreateAttending): Promise<HttpResponse<Attending>> {
    try {
      const { attendant, client, items } = params
      if (!attendant || client || items?.length) {
        return {
          body: {
            message: 'Faltando campos obrigatórios',
            status: false,
          },
          statusCode: 400,
        }
      }

      const attending = await this.createAttendingRepository.createAttending(
        params
      )

      return {
        body: {
          message: 'Operação concluída com sucesso',
          status: true,
          data: attending,
        },
        statusCode: 200,
      }
    } catch (error: any) {
      return {
        body: {
          message: error.message,
          status: true,
        },
        statusCode: 500,
      }
    }
  }
}
