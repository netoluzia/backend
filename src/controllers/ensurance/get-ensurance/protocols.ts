import { InsuranceCompany } from '../../../models/Insurance'
import { HttpResponse } from '../../protocols'

export interface IGetInsuranceController {
  handle(id: string): Promise<HttpResponse<InsuranceCompany>>
}
export interface IGetInsuranceRepository {
  getInsurance(id: string): Promise<InsuranceCompany>
}
