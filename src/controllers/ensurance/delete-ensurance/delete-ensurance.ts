import { InsuranceCompany } from '../../../models/Insurance'
import { MongoDeleteInsuranceRepository } from '../../../repositories/ensurance/delete-insurance/mongo-delete-insurance'
import { HttpResponse } from '../../protocols'
import { IDeleteInsuranceController } from './protocols'

export class DeleteInsuranceController implements IDeleteInsuranceController {
  constructor(
    private readonly deleteInsuranceRepository: MongoDeleteInsuranceRepository
  ) {}
  async handle(id: string): Promise<HttpResponse<InsuranceCompany>> {
    try {
      const insurance = await this.deleteInsuranceRepository.deleteInsurance(id)

      return {
        body: {
          data: insurance,
          status: true,
          message: 'Seguardaora eliminada com sucesso',
        },
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          status: true,
          message: 'Seguardaora eliminada com sucesso',
        },
        statusCode: 500,
      }
    }
  }
}
