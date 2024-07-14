import { $Enums, Category, Protocol } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateProtocol,
  TUpdateProtocol,
} from '../../validator/protocol.validator'

import { prisma } from '../../database/prisma'

export class ProtocolRepository
  implements IRepository<Protocol, TCreateProtocol, TUpdateProtocol>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    category?: string
    orderBy?: any
  }): Promise<Meta<Protocol[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage

    const protocols = await prisma.protocol.findMany({
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
    })
    const total = await prisma.protocol.count({
      where: {
        AND: [{ deletedAt: null }],
      },
    })
    return { data: protocols, meta: { page, perPage, search, total } }
  }

  async show(id: string): Promise<Meta<Protocol>> {
    const protocol = await prisma.protocol.findUnique({
      where: { id },
    })
    return { data: protocol }
  }

  async create(payload: TCreateProtocol): Promise<Meta<Protocol>> {
    const protocol = await prisma.protocol.create({
      data: { ...payload, deletedAt: null },
    })
    return { data: protocol }
  }

  async update(id: string, payload: TUpdateProtocol): Promise<Meta<Protocol>> {
    const protocol = await prisma.protocol.update({
      where: { id },
      data: { ...payload },
    })
    return { data: protocol }
  }

  async softDelete(id: string): Promise<Meta<Protocol>> {
    const protocol = await prisma.protocol.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: protocol }
  }

  async destroy(id: string): Promise<Meta<Protocol>> {
    const protocol = await prisma.protocol.delete({
      where: { id },
    })
    return { data: protocol }
  }
  async searchByName(name: string): Promise<Meta<Protocol[]>> {
    const protocols = await prisma.protocol.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
    })
    return { data: protocols }
  }
}
