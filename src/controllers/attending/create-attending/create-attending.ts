import { ObjectId } from 'mongodb'
import { Attending } from '../../../models/Attending'
import { CreatingAttending, HttpResponse } from './protocols'
import {
  ICreateAttendingController,
  ICreateAttendingRepository,
} from './protocols'
import { Socket } from 'socket.io'
export class CreateAttendingController implements ICreateAttendingController {
  constructor(
    private readonly createAttendingRepository: ICreateAttendingRepository,
    private readonly io: Socket
  ) {}
  async handle(params: CreatingAttending): Promise<HttpResponse<Attending>> {
    try {
      const { attendant, client } = params
      if (!attendant || !client) {
        return {
          body: {
            message: 'Faltando campos obrigatórios',
            status: false,
          },
          statusCode: 400,
        }
      }

      const attending = await this.createAttendingRepository.createAttending({
        attendant: new ObjectId(attendant),
        client: new ObjectId(client),
        status: 'to-trial',
      })

      this.io.emit('attending:from-attending', attending)
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
