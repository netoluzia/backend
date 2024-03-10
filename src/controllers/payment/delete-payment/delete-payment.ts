import { Payment } from '../../../models/Payment'
import { HttpResponse } from '../../protocols'
import { IDeletePaymentController, IDeletePaymentRepository } from './protocols'

export class DeletePaymentController implements IDeletePaymentController {
  constructor(
    private readonly deletePaymentRepository: IDeletePaymentRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<Payment>> {
    try {
      const payment = await this.deletePaymentRepository.deletePayment(id)
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
