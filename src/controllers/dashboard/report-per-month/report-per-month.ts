import { HttpResponse } from '../../protocols'
import {
  IReportPerMonthController,
  IReportPerMonthRepository,
} from './protocols'

export class ReportPerMonthController implements IReportPerMonthController {
  constructor(private readonly repository: IReportPerMonthRepository) {}
  async handle(): Promise<HttpResponse<any>> {
    try {
      const report = await this.repository.reportPerMonth()
      return {
        body: {
          message: 'Operação concluída com sucesso',
          status: true,
          data: report,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Operação falhou',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
