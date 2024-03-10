import { InsuranceCompany } from '../../../models/Insurance'
import { HttpResponse } from '../../protocols'
import { IGetInsuranceController, IGetInsuranceRepository } from './protocols'

export class GetInsuranceController implements IGetInsuranceController {
  constructor(
    private readonly getInsuranceRepository: IGetInsuranceRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<InsuranceCompany>> {
    try {
      const insurance = await this.getInsuranceRepository.getInsurance(id)
      return {
        body: {
          message: 'Operacao concluida com sucesso',
          status: true,
          data: insurance,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Operacao concluida com erros',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
