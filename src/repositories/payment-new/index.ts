import { $Enums, Category, Payment } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreatePayment,
  TUpdatePayment,
} from '../../validator/payment.validator'

import { prisma } from '../../database/prisma'

export class PaymentRepository
  implements IRepository<Payment, TCreatePayment, TUpdatePayment>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    category?: string
    orderBy?: any
  }): Promise<Meta<Payment[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage

    const payments = await prisma.payment.findMany({
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
    const total = await prisma.payment.count({
      where: {
        AND: [{ deletedAt: null }],
      },
    })
    return {
      data: payments,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async show(id: string): Promise<Meta<Payment>> {
    const payment = await prisma.payment.findUnique({
      where: { id },
    })
    return { data: payment }
  }

  async create(payload: TCreatePayment): Promise<Meta<Payment>> {
    const payment = await prisma.payment.create({
      data: { ...payload, deletedAt: null },
    })
    return { data: payment }
  }

  async update(id: string, payload: TUpdatePayment): Promise<Meta<Payment>> {
    const payment = await prisma.payment.update({
      where: { id },
      data: { ...payload },
    })
    return { data: payment }
  }

  async softDelete(id: string): Promise<Meta<Payment>> {
    const payment = await prisma.payment.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: payment }
  }

  async destroy(id: string): Promise<Meta<Payment>> {
    const payment = await prisma.payment.delete({
      where: { id },
    })
    return { data: payment }
  }
  async searchByName(name: string): Promise<Meta<Payment[]>> {
    const materials = await prisma.payment.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
    })
    return { data: materials }
  }
}
