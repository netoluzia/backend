import { $Enums, Company } from '@prisma/client'
import {
  HttpResponse,
  IController,
  IRepository,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import {
  createCompany,
  TCreateCompany,
  TUpdateCompany,
  updateCompany,
} from '../../validator/company.validator'

export class CompanyController
  implements IController<Company, TCreateCompany, TUpdateCompany>
{
  constructor(
    private readonly repository: IRepository<
      Company,
      TCreateCompany,
      TUpdateCompany
    >
  ) {}
  async index(payload: {
    search?: string
    page?: number
    perPage?: number
    category?: string
    orderBy?: any
  }): Promise<HttpResponse<Company[]>> {
    try {
      const response = await this.repository.index(payload)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async show(id: string): Promise<HttpResponse<Company>> {
    try {
      const response = await this.repository.show(id)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: StatusCode.OK,
        success: true,
        body: {
          data: {
            id: '660c1301d6dbda0666bc5610',
            name: 'VLS Global Prestação de Serviços',
            account_number: '',
            address: 'Zango 1',
            bank: '',
            email: 'clinicaalfavida2020@gmail.com',
            iban: '',
            nif: '5000139777',
            tax_ii: 0,
            logo: null,
            createdAt: new Date('2024-07-11T20:54:53.706Z'),
            updatedAt: new Date('2024-07-18T22:38:19.720Z'),
            deletedAt: null,
            phone: ' 946803750',
          },
        },
      }
    }
  }
  async create(payload: TCreateCompany): Promise<HttpResponse<Company>> {
    try {
      const payloadValidated = createCompany.parse(payload)
      const response = await this.repository.create(payloadValidated)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async update(
    id: string,
    payload: TUpdateCompany
  ): Promise<HttpResponse<Company>> {
    try {
      const payloadValidated = updateCompany.parse(payload)
      const response = await this.repository.update(id, payloadValidated)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async softDelete(id: string): Promise<HttpResponse<Company>> {
    try {
      const response = await this.repository.softDelete(id)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async destroy(id: string): Promise<HttpResponse<Company>> {
    try {
      const response = await this.repository.destroy(id)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async searchByName(name: string): Promise<HttpResponse<Company[]>> {
    try {
      if (!this.repository.searchByName) throw new Error('Nao implementado')
      const response = await this.repository.searchByName(name)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
}
