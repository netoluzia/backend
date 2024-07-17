import { HttpResponse } from './global.interfaces'

export interface IFinanceRepository {
  receipt(): Promise<{ toReceive: number; received: number }>
}

export interface IFinanceController {
  receipt(): Promise<HttpResponse<{ toReceive: number; received: number }>>
}
