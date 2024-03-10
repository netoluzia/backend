import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'

export interface IDeletePaymentController {
  handle(id: string): Promise<HttpResponse<Payment>>
}
export interface IDeletePaymentRepository {
  deletePayment(id: string): Promise<Payment>
}
