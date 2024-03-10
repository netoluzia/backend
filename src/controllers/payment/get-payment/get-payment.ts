import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'
import { IGetPaymentController, IGetPaymentRepository } from './protocols'

export class GetPaymentController implements IGetPaymentController {
  constructor(private readonly getPaymentRepository: IGetPaymentRepository) {}
  async handle(id: string): Promise<HttpResponse<Payment>> {
    try {
      const payment = await this.getPaymentRepository.getPayment(id)
      return {
        body: {
          data: payment,
          message: 'Operacao concluia com sucesso',
          status: true,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Operacao falhou',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
