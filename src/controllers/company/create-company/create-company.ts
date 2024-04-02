import { Company } from '../../../models/Company'
import { HttpResponse } from '../../protocols'
import {
  CreateCompany,
  ICreateCompanyController,
  ICreateCompanyRepository,
  IUpdateCompanyRepository,
} from './protocols'

export class CreateCompanyControler implements ICreateCompanyController {
  constructor(
    private readonly create: ICreateCompanyRepository,
    private readonly update: IUpdateCompanyRepository
  ) {}
  async handle(
    payload: CreateCompany,
    id?: string
  ): Promise<HttpResponse<Company>> {
    try {
      console.log('Hey')
      let company: Company
      if (id) {
        company = await this.update.updateCompany(payload, id)
      } else {
        console.log('Entrou')
        company = await this.create.createCompany(payload)
      }
      return {
        body: {
          message: 'Operação realizada com sucesso',
          status: true,
          data: company,
        },
        statusCode: 201,
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
