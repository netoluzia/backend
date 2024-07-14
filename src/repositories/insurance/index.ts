import { Insurance } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateInsurance,
  TUpdateInsurance,
} from '../../validator/insurance.validator'

import { prisma } from '../../database/prisma'

export class InsuranceRepository
  implements IRepository<Insurance, TCreateInsurance, TUpdateInsurance>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
  }): Promise<Meta<Insurance[]>> {
    const { page, perPage, search } = payload
    const skip = (page - 1) * perPage

    const insurances = await prisma.insurance.findMany({
      take: perPage,
      skip: skip,
      where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
    })
    const total = await prisma.insurance.count()
    return { data: insurances, meta: { page, perPage, search, total } }
  }

  async show(id: string): Promise<Meta<Insurance>> {
    const insurance = await prisma.insurance.findUnique({ where: { id } })
    return { data: insurance }
  }

  async create(payload: TCreateInsurance): Promise<Meta<Insurance>> {
    const insurance = await prisma.insurance.create({ data: payload })
    return { data: insurance }
  }

  async update(
    id: string,
    payload: TUpdateInsurance
  ): Promise<Meta<Insurance>> {
    const insurance = await prisma.insurance.update({
      where: { id },
      data: { ...payload },
    })
    return { data: insurance }
  }

  async softDelete(id: string): Promise<Meta<Insurance>> {
    const insurance = await prisma.insurance.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: insurance }
  }

  async destroy(id: string): Promise<Meta<Insurance>> {
    const insurance = await prisma.insurance.delete({
      where: { id },
    })
    return { data: insurance }
  }
}
