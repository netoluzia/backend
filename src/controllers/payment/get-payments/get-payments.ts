import { Payment } from '../../../models/Payment'
import { MongoGetPaymentsRepository } from '../../../repositories/payment/get-payments/get-payments'
import { HttpResponse } from '../../protocols'
import { IGetPaymentsController } from './protocols'

export class GetPaymentsController implements IGetPaymentsController {
  constructor(
    private readonly getPaymentsRepository: MongoGetPaymentsRepository
  ) {}
  async handle(): Promise<HttpResponse<Payment[]>> {
    try {
      const payments = await this.getPaymentsRepository.getPayments()
      return {
        statusCode: 200,
        body: {
          message: 'Métodos de pagamento carregado com sucesso',
          data: payments,
          status: true,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: 'Something went wrong',
          status: false,
        },
      }
    }
  }
}
