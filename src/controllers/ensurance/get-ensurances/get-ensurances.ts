import { InsuranceCompany } from '../../../models/Insurance'
import { HttpResponse } from '../../protocols'
import { IGetInsurancesController, IGetInsurancesRepository } from './protocols'

export class GetInsurancesController implements IGetInsurancesController {
  constructor(
    private readonly getInsurancesRepository: IGetInsurancesRepository
  ) {}
  async handle(): Promise<HttpResponse<InsuranceCompany[]>> {
    try {
      const insurances = await this.getInsurancesRepository.getInsurances()
      return {
        body: {
          message: 'Seguradoras carregadas com sucesso',
          status: true,
          data: insurances,
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          message: 'Ocorreu um erro',
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
