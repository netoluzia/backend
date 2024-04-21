import { HttpResponse } from '../protocols'

export interface IGetReportFinancialRepository {
  getReportFinancial(params: any): Promise<any>
}
export interface IGetReportFinancialController {
  handle(params: any): Promise<HttpResponse<any>>
}
