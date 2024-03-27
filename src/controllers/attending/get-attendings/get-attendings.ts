import { HttpResponse } from '../../protocols'
import { IGetAtendingsController, IGetAtendingsRepository } from './protocols'

export class GetAttendingsController implements IGetAtendingsController {
  constructor(
    private readonly getAttendingsRepository: IGetAtendingsRepository
  ) {}
  async handle(status: string): Promise<HttpResponse<any>> {
    try {
      const attendings = await this.getAttendingsRepository.getAttendings(
        status
      )
      return {
        body: {
          data: attendings,
          message: 'Operação concluída com sucesso',
          status: true,
        },
        statusCode: 200,
      }
    } catch (error: any) {
      return {
        body: {
          message: error.message,
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
