import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'

export interface IGetPaymentsController {
  handle(): Promise<HttpResponse<Payment[]>>
}
export interface IGetPaymentsRepository {
  getPayments(): Promise<Payment[]>
}
