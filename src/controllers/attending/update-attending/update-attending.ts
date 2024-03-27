import { Socket } from 'socket.io'
import { Attending } from '../../../models/Attending'
import { HttpResponse } from '../../protocols'
import { CreatingAttending } from '../create-attending/protocols'
import {
  IUpdateAttendingController,
  IUpdateAttendingRepository,
} from './protocols'

export class UpdateAttendingController implements IUpdateAttendingController {
  constructor(
    private readonly updateAttendingRepository: IUpdateAttendingRepository,
    private readonly io: Socket
  ) {}
  async handle(
    id: string,
    params: CreatingAttending
  ): Promise<HttpResponse<Attending>> {
    try {
      const { status } = params
      const attending = await this.updateAttendingRepository.updateAttending(
        id,
        params
      )
      if (status == 'to-doctor-1') {
        this.io.emit('attending:from-trial')
      } else if (status == 'to-attendant') {
        this.io.emit('attending:from-doctor-1')
      } else if (status == 'to-lab') {
        this.io.emit('attending:from-doctor-1-attendant')
      }

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
