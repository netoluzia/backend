import { $Enums, Category, Exemption } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateExemption,
  TUpdateExemption,
} from '../../validator/exemption.validator'

import { prisma } from '../../database/prisma'

export class ExemptionRepository
  implements IRepository<Exemption, TCreateExemption, TUpdateExemption>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    category?: string
    orderBy?: any
  }): Promise<Meta<Exemption[]>> {
    const exemptions = await prisma.exemption.findMany({})
    return {
      data: exemptions,
    }
  }

  async show(id: string): Promise<Meta<Exemption>> {
    const exemption = await prisma.exemption.findUnique({
      where: { id },
    })
    return { data: exemption }
  }

  async create(payload: TCreateExemption): Promise<Meta<Exemption>> {
    const exemption = await prisma.exemption.create({
      data: { ...payload },
    })
    return { data: exemption }
  }

  async update(
    id: string,
    payload: TUpdateExemption
  ): Promise<Meta<Exemption>> {
    const exemption = await prisma.exemption.update({
      where: { id },
      data: { ...payload },
    })
    return { data: exemption }
  }

  async destroy(id: string): Promise<Meta<Exemption>> {
    const exemption = await prisma.exemption.delete({
      where: { id },
    })
    return { data: exemption }
  }
  softDelete(
    id: string
  ): Promise<
    Meta<{
      id: string
      code: string
      description: string
      createdAt: Date
      updatedAt: Date
    }>
  > {
    throw new Error('Method not implemented.')
  }
}
