import { InsuranceCompany } from '../../../models/Insurance'
import { HttpResponse } from '../../protocols'

export interface IGetInsurancesController {
  handle(): Promise<HttpResponse<InsuranceCompany[]>>
}
export interface IGetInsurancesRepository {
  getInsurances(): Promise<InsuranceCompany[]>
}
