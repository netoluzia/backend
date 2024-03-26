import { ObjectId } from 'mongodb'
import { Attending } from '../../../models/Attending'
import { HttpResponse } from './protocols'
import {
  CreateAttending,
  ICreateAttendingController,
  ICreateAttendingRepository,
} from './protocols'
import { Socket } from 'socket.io'
export class CreateAttendingController implements ICreateAttendingController {
  constructor(
    private readonly createAttendingRepository: ICreateAttendingRepository,
    private readonly io: Socket
  ) {}
  async handle(params: CreateAttending): Promise<HttpResponse<Attending>> {
    try {
      const { attendant, client, itemsAttendant } = params
      if (!attendant || !client || !itemsAttendant.items.length) {
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
        itemsAttendant: itemsAttendant,
        client: new ObjectId(client),
      })

      this.io.emit('attending:new', attending)
      console.log('Chegu')
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
