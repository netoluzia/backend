import { HttpResponse } from '../../protocols'
import { IGetLogsController, IGetLogsRepository } from './protocols'

export class StockLogsController implements IGetLogsController {
  constructor(private readonly repository: IGetLogsRepository) {}
  async handle(params: string): Promise<HttpResponse<any>> {
    try {
      const [year, month] = params.split('-')
      const insurances = await this.repository.getLogs({
        year: Number(year),
        month: Number(month),
      })
      return {
        body: {
          message: 'Registos carregados com sucesso',
          status: true,
          data: insurances,
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
