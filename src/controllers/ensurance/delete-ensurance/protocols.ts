import { InsuranceCompany } from '../../../models/Insurance'
import { Service } from '../../../models/Service'
import { HttpResponse } from '../../protocols'

export interface IDeleteInsuranceController {
  handle(id: string): Promise<HttpResponse<InsuranceCompany>>
}
export interface IDeleteInsuranceRepository {
  deleteInsurance(id: string): Promise<InsuranceCompany>
}
