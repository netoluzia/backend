import { $Enums, Invoice } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateInvoice,
  TUpdateInvoice,
} from '../../validator/invoice.validator'
import { prisma } from '../../database/prisma'

export class InvoiceRepository
  implements IRepository<Invoice, TCreateInvoice, TUpdateInvoice>
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
  }): Promise<Meta<Invoice[]>> {
    const { page, perPage, search } = payload
    const skip = (page - 1) * perPage

    const invoices = await prisma.invoice.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? { reference: { contains: search, mode: 'insensitive' } }
        : {},
      include: {
        customer: true,
        invoiceSource: true,
      },
    })
    const total = await prisma.invoice.count()
    return { data: invoices, meta: { page, perPage, search, total } }
  }
  async show(id: string): Promise<Meta<Invoice>> {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: { include: { service: true } },
        customer: true,
        payment: true,
        user: true,
        invoiceSource: true,
      },
    })
    console.log('Hey there')
    return { data: invoice }
  }
  async create(payload: TCreateInvoice): Promise<Meta<Invoice>> {
    const { invoiceItems, ...rest } = payload
    const invoice = await prisma.invoice.create({
      data: {
        ...rest,
        invoiceItems: {
          createMany: {
            data: invoiceItems.map((item) => ({
              discount: item.discount,
              price: item.price,
              quantity: item.quantity,
              serviceId: item.serviceId,
              total: item.total,
            })),
          },
        },
      },
    })
    return { data: invoice }
  }
  update(id: string, payload: TUpdateInvoice): Promise<Meta<Invoice>> {
    throw new Error('Method not implemented.')
  }
  softDelete(id: string): Promise<Meta<Invoice>> {
    throw new Error('Method not implemented.')
  }
  destroy(id: string): Promise<Meta<Invoice>> {
    throw new Error('Method not implemented.')
  }
}
