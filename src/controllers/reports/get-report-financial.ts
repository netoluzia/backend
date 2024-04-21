import { HttpResponse } from '../protocols'
import {
  IGetReportFinancialController,
  IGetReportFinancialRepository,
} from './protocols'

export class GetReportFinancialController
  implements IGetReportFinancialController
{
  constructor(
    private readonly getReportFinancialRepository: IGetReportFinancialRepository
  ) {}
  async handle(params: any): Promise<HttpResponse<any>> {
    try {
      const document =
        await this.getReportFinancialRepository.getReportFinancial(params)

      return {
        body: {
          message: 'Operacao efetuada com sucesso',
          status: true,
          data: document,
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
