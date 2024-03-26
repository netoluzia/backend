import { HttpResponse } from '../../protocols'
import { IGetAttendingRepository, IGetAttendingController } from './protocols'

export class GetAttendingController implements IGetAttendingController {
  constructor(
    private readonly getAttendingRepository: IGetAttendingRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<any>> {
    try {
      const attending = await this.getAttendingRepository.getAttending(id)
      return {
        body: {
          message: 'Operacao concluida com sucesso',
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
        statusCode: 200,
      }
    }
  }
}
