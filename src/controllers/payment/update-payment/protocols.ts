import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'
import { CreatePayment } from '../create-payment/protocols'

export interface IUpdatePaymentController {
  handle(id: string, payload: CreatePayment): Promise<HttpResponse<Payment>>
}
export interface IUpdatePaymentRepository {
  updatePayment(id: string, payload: CreatePayment): Promise<Payment>
}
