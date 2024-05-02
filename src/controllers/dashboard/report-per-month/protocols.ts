import { HttpResponse } from '../../protocols'

export interface IReportPerMonthRepository {
  reportPerMonth(): Promise<any>
}

export interface IReportPerMonthController {
  handle(): Promise<HttpResponse<any>>
}
