import { InsuranceCompany } from '../../../models/Insurance'
import { HttpResponse } from '../../protocols'
import { CreateInsuranceParams } from '../create-ensurance/protocols'

export interface IUpdateInsuranceController {
  handle(
    id: string,
    payload: CreateInsuranceParams
  ): Promise<HttpResponse<InsuranceCompany>>
}
export interface IUpdateInsuranceRepository {
  updateService(
    id: string,
    payload: CreateInsuranceParams
  ): Promise<InsuranceCompany>
}
