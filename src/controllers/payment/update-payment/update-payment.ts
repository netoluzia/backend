import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'
import { CreatePayment } from '../create-payment/protocols'
import { IUpdatePaymentController, IUpdatePaymentRepository } from './protocols'

export class UpdatePaymentController implements IUpdatePaymentController {
  constructor(
    private readonly updatePaymentRepository: IUpdatePaymentRepository
  ) {}
  async handle(
    id: string,
    payload: CreatePayment
  ): Promise<HttpResponse<Payment>> {
    try {
      const payment = await this.updatePaymentRepository.updatePayment(
        id,
        payload
      )
      return {
        body: {
          message: 'Pagamneto atualizado com sucesso',
          data: payment,
          status: true,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Pagamento finalizado com erro',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
