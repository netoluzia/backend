import { Partner } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreatePartner,
  TUpdatePartner,
} from '../../validator/partner.validator'

import { prisma } from '../../database/prisma'

export class PartnerRepository
  implements IRepository<Partner, TCreatePartner, TUpdatePartner>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    orderBy?: any
  }): Promise<Meta<Partner[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage

    const partners = await prisma.partner.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? {
            AND: [
              { name: { contains: search, mode: 'insensitive' } },
              { deletedAt: null },
            ],
          }
        : {
            AND: [{ deletedAt: null }],
          },
      orderBy: JSON.parse(orderBy),
      include: {
        _count: { select: { customer: true } },
      },
    })
    const total = await prisma.partner.count({
      where: search
        ? {
            AND: [
              { name: { contains: search, mode: 'insensitive' } },
              { deletedAt: null },
            ],
          }
        : {
            AND: [{ deletedAt: null }],
          },
    })
    return {
      data: partners,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async show(id: string): Promise<Meta<Partner>> {
    const partner = await prisma.partner.findUnique({
      where: { id },
      include: { _count: { select: { customer: true } } },
    })
    return { data: partner }
  }

  async create(payload: TCreatePartner): Promise<Meta<Partner>> {
    const partner = await prisma.partner.create({
      data: { deletedAt: null, ...payload },
    })
    return { data: partner }
  }

  async update(id: string, payload: TUpdatePartner): Promise<Meta<Partner>> {
    const partner = await prisma.partner.update({
      where: { id },
      data: { ...payload },
    })
    return { data: partner }
  }

  async softDelete(id: string): Promise<Meta<Partner>> {
    const partner = await prisma.partner.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: partner }
  }

  async destroy(id: string): Promise<Meta<Partner>> {
    const partner = await prisma.partner.delete({
      where: { id },
    })
    return { data: partner }
  }
}
