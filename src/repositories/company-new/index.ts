import { Company } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateCompany,
  TUpdateCompany,
} from '../../validator/company.validator'
import { prisma } from '../../database/prisma'

export class CompanyRepository
  implements IRepository<Company, TCreateCompany, TUpdateCompany>
{
  index(payload: {
    search?: string
    page?: number
    perPage?: number
    orderBy?: any
  }): Promise<Meta<Company[]>> {
    throw new Error('Method not implemented.')
  }
  indexByStatus?(payload: {
    search?: string
    page?: number
    perPage?: number
    status?: string
  }): Promise<Meta<Company[]>> {
    throw new Error('Method not implemented.')
  }
  async show(id: string): Promise<Meta<Company>> {
    const company = await prisma.company.findFirst()
    return { data: company }
  }
  create(payload: TCreateCompany): Promise<Meta<Company>> {
    throw new Error('Method not implemented.')
  }
  async update(id: string, payload: TUpdateCompany): Promise<Meta<Company>> {
    const companyData = await prisma.company.findFirst()
    let company: Company
    if (companyData) {
      company = await prisma.company.update({
        where: { id: companyData.id },
        data: {
          ...payload,
        },
      })
    } else {
      company = await prisma.company.create({
        data: payload,
      })
    }

    return { data: company }
  }
  softDelete(id: string): Promise<Meta<Company>> {
    throw new Error('Method not implemented.')
  }
  destroy(id: string): Promise<Meta<Company>> {
    throw new Error('Method not implemented.')
  }
  searchByName?(name: string): Promise<Meta<Company[]>> {
    throw new Error('Method not implemented.')
  }
  filter?(search: string): Promise<Meta<Company[]>> {
    throw new Error('Method not implemented.')
  }
  invoiceFromInsurance?(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    insuranceId: string,
    statusOfDocument: string
  ): Promise<Meta<Company[]>> {
    throw new Error('Method not implemented.')
  }
  invoiceFromCustomer?(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    insuranceId: string,
    statusOfDocument: string
  ): Promise<Meta<Company[]>> {
    throw new Error('Method not implemented.')
  }
}
