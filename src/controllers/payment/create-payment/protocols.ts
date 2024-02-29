import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'

export interface CreatePayment {
  code: string
  title: string
}

export interface ICreatePaymentController {
  handle(params: CreatePayment): Promise<HttpResponse<Payment>>
}
export interface ICreatePaymentRepository {
  createPayment(params: CreatePayment): Promise<Payment>
}
