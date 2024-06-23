import { Company } from '../../../models/Company'
import { HttpResponse } from '../../protocols'

export interface CreateCompany {
  name?: string
  nif?: string
  email?: string
  phone_number?: string
  others_phone_numbers?: string[]
  address?: string
  account_number: string
  bank: string
  iban: string
}

export interface ICreateCompanyRepository {
  createCompany(payload: CreateCompany): Promise<Company>
}
export interface IUpdateCompanyRepository {
  updateCompany(payload: CreateCompany, id: string): Promise<Company>
}
export interface ICreateCompanyController {
  handle(payload: CreateCompany, id?: string): Promise<HttpResponse<Company>>
}
