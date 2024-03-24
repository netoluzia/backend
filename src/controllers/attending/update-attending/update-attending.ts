import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { CreateAttending, UpdateAttending } from '../create-attending/protocols'
import {
  IUpdateAttendingController,
  IUpdateAttendingRepository,
} from './protocols'

export class UpdateAttendingController implements IUpdateAttendingController {
  constructor(
    private readonly updateAttendingRepository: IUpdateAttendingRepository
  ) {}
  async handle(
    id: string,
    params: UpdateAttending
  ): Promise<HttpResponse<Attending>> {
    try {
      const attending = await this.updateAttendingRepository.updateAttending(
        id,
        params
      )

      return {
        body: {
          message: 'Operação concluída com sucesso',
          status: true,
          data: attending,
        },
        statusCode: 201,
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
