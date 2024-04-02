import { Company } from '../../../models/Company'
import { HttpResponse } from '../../protocols'

export interface IGetCompanyRepository {
  getCompany(): Promise<Company>
}
export interface IGetCompanyController {
  handle(): Promise<HttpResponse<Company>>
}
