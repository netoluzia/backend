import {
  IFinanceController,
  IFinanceRepository,
} from '../../types/finance.interface'
import {
  HttpResponse,
  Message,
  StatusCode,
} from '../../types/global.interfaces'

export class FinanceController implements IFinanceController {
  constructor(private readonly repository: IFinanceRepository) {}
  async receipt(): Promise<
    HttpResponse<{ toReceive: number; received: number }>
  > {
    try {
      const response = await this.repository.receipt()
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
        body: { data: response },
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
}
