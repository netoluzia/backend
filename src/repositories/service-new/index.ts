import { Category, Service } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateService,
  TUpdateService,
} from '../../validator/service.validator'

import { prisma } from '../../database/prisma'

export class ServiceRepository
  implements IRepository<Service, TCreateService, TUpdateService>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    orderBy?: any
    category?: string
  }): Promise<Meta<Service[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage

    const services = await prisma.service.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? {
            AND: [
              { name: { contains: search, mode: 'insensitive' } },
              { deletedAt: null },
              { category: (payload.category as Category) || 'ENF' },
            ],
          }
        : {
            AND: [
              { deletedAt: null },
              { category: (payload.category as Category) || 'ENF' },
            ],
          },
      orderBy: JSON.parse(orderBy),
    })
    const total = await prisma.service.count({
      where: {
        AND: [
          { deletedAt: null },
          { category: (payload.category as Category) || 'ENF' },
        ],
      },
    })
    return {
      data: services,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async show(id: string): Promise<Meta<Service>> {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        serviceExpendableMaterial: {
          include: { expendableMaterial: { select: { name: true } } },
        },
      },
    })
    return { data: service }
  }

  async create(payload: TCreateService): Promise<Meta<Service>> {
    const { materials, ...rest } = payload
    let service: Service
    service = await prisma.service.create({
      data: { ...rest, deletedAt: null },
    })
    if (materials) {
      service = await prisma.service.update({
        where: { id: service.id },
        data: {
          serviceExpendableMaterial: {
            createMany: {
              data: materials.map((item) => ({
                expendableMaterialId: item.expendableMaterialId,
                quantity: item.quantity,
              })),
            },
          },
        },
      })
    }
    return { data: service }
  }

  async update(id: string, payload: TUpdateService): Promise<Meta<Service>> {
    const { materials, ...rest } = payload
    let service: Service
    service = await prisma.service.update({
      where: { id },
      data: { ...rest },
    })
    if (materials) {
      service = await prisma.service.update({
        where: { id },
        data: {
          serviceExpendableMaterial: {
            createMany: {
              data: materials.map((item) => ({
                expendableMaterialId: item.expendableMaterialId,
                quantity: item.quantity,
              })),
            },
            // connectOrCreate: [
            //   {
            //     where: { expendableMaterialId: materials[0].expendableMaterialId }
            //   }
            // ]
          },
        },
      })
    }
    return { data: service }
  }

  async softDelete(id: string): Promise<Meta<Service>> {
    const service = await prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: service }
  }

  async destroy(id: string): Promise<Meta<Service>> {
    const service = await prisma.service.delete({
      where: { id },
    })
    return { data: service }
  }
}
