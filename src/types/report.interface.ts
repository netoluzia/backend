import { HttpResponse } from './global.interfaces'

export interface IReportRepository {
  receiptByArea(): Promise<any>
}
export interface IReportController {
  receiptByArea(): Promise<HttpResponse<any>>
}
