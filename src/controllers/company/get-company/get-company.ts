import { Company } from '../../../models/Company'
import { HttpResponse } from '../../protocols'
import { IGetCompanyController, IGetCompanyRepository } from './protocols'

export class GetCompanyController implements IGetCompanyController {
  constructor(private readonly getCompany: IGetCompanyRepository) {}
  async handle(): Promise<HttpResponse<Company>> {
    try {
      const company = await this.getCompany.getCompany()
      return {
        body: {
          data: company,
          message: 'Operacao realizada com sucesso',
          status: true,
        },
        statusCode: 200,
      }
    } catch (error: any) {
      return {
        body: {
          message: error.message,
          status: false,
        },
        statusCode: 500,
      }
    }
  }
}
