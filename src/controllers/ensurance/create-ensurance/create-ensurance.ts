import { InsuranceCompany } from '../../../models/Insurance'
import { HttpRequest, HttpResponse } from '../../protocols'
import {
  CreateInsuranceParams,
  ICreateInsuranceController,
  ICreateInsuranceRepository,
} from './protocols'

export class CreateInsuranceController implements ICreateInsuranceController {
  constructor(
    private readonly createServiceRepository: ICreateInsuranceRepository
  ) {}
  async handle(
    params: CreateInsuranceParams
  ): Promise<HttpResponse<InsuranceCompany>> {
    try {
      if (!params) {
        return {
          statusCode: 400,
          body: {
            message: 'Bad request',
            status: false,
          },
        }
      }
      const { ...rest } = params
      const service = await this.createServiceRepository.createInsurance({
        ...rest,
      })

      return {
        statusCode: 200,
        body: {
          data: service,
          message: 'Seguradora criada com sucesso',
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
