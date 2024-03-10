import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'

export interface IGetPaymentController {
  handle(id: string): Promise<HttpResponse<Payment>>
}
export interface IGetPaymentRepository {
  getPayment(id: string): Promise<Payment>
}
