import { User } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import { TCreateUser, TUpdateUser } from '../../validator/user.validator'

import { prisma } from '../../database/prisma'

export class UserRepository
  implements IRepository<User, TCreateUser, TUpdateUser>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    orderBy?: any
  }): Promise<Meta<User[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage
    const users = await prisma.user.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? {
            AND: [
              { name: { contains: search, mode: 'insensitive' } },
              { deletedAt: null },
            ],
          }
        : { deletedAt: null },
      orderBy: JSON.parse(orderBy),
    })
    const total = await prisma.user.count({ where: { deletedAt: null } })
    return {
      data: users,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async show(id: string): Promise<Meta<User>> {
    const user = await prisma.user.findUnique({ where: { id } })
    return { data: user }
  }

  async create(payload: TCreateUser): Promise<Meta<User>> {
    const user = await prisma.user.create({
      data: { ...payload, deletedAt: null },
    })
    return { data: user }
  }

  async update(id: string, payload: TUpdateUser): Promise<Meta<User>> {
    const user = await prisma.user.update({
      where: { id },
      data: { ...payload },
    })
    return { data: user }
  }

  async softDelete(id: string): Promise<Meta<User>> {
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: user }
  }

  async destroy(id: string): Promise<Meta<User>> {
    const user = await prisma.user.delete({
      where: { id },
    })
    return { data: user }
  }
}
