import { Payment } from '../../../models/Payment'
import { MongoCreatePaymentRepository } from '../../../repositories/payment/create-payment/mongo-create-payment'
import { HttpResponse } from '../../protocols'
import { CreatePayment, ICreatePaymentController } from './protocols'

export class CreatePaymentController implements ICreatePaymentController {
  constructor(
    private readonly createPaymentRepository: MongoCreatePaymentRepository
  ) {}
  async handle(params: CreatePayment): Promise<HttpResponse<Payment>> {
    try {
      const { code, title } = params
      if (!code || !title) {
        return {
          statusCode: 400,
          body: 'Missing some fields',
        }
      }
      const payment = await this.createPaymentRepository.createPayment(params)
      return {
        statusCode: 201,
        body: payment,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      }
    }
  }
}
