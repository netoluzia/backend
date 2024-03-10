import { InsuranceCompany } from '../../../models/Insurance'
import { HttpResponse } from '../../protocols'
import { CreateInsuranceParams } from '../create-ensurance/protocols'
import {
  IUpdateInsuranceController,
  IUpdateInsuranceRepository,
} from './protocols'

export class UpdateInsuranceController implements IUpdateInsuranceController {
  constructor(
    private readonly updateInsuranceRepository: IUpdateInsuranceRepository
  ) {}
  async handle(
    id: string,
    payload: CreateInsuranceParams
  ): Promise<HttpResponse<InsuranceCompany>> {
    try {
      const insurance = await this.updateInsuranceRepository.updateService(
        id,
        payload
      )
      return {
        body: {
          data: insurance,
          status: true,
          message: 'Seguradora atualizada com sucesso',
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          status: false,
          message: 'Seguradora nao foi atualizada',
        },
        statusCode: 500,
      }
    }
  }
}
