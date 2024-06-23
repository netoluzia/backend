import { HttpResponse } from '../../protocols'

export interface IGetLogsRepository {
  getLogs(params: { month: number; year: number }): Promise<any>
}

export interface IGetLogsController {
  handle(params: string): Promise<HttpResponse<any>>
}
