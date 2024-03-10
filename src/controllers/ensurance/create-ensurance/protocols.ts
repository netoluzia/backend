import { InsuranceCompany } from '../../../models/Insurance'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface CreateInsuranceParams {
  name?: string
  address?: string
  nif?: string
  email?: string
  phone_number?: string
  website?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateInsuranceRepository {
  createInsurance(params: CreateInsuranceParams): Promise<InsuranceCompany>
}
export interface ICreateInsuranceController {
  handle(params: CreateInsuranceParams): Promise<HttpResponse<InsuranceCompany>>
}
