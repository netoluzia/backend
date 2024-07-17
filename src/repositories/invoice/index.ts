import { $Enums, Invoice, InvoiceStatus, InvoiceType } from '@prisma/client'
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
    category?: string
  }): Promise<Meta<Invoice[]>> {
    const { page, perPage, search, category } = payload
    const skip = (page - 1) * perPage

    const invoices = await prisma.invoice.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? {
            AND: [
              {
                reference: { contains: search, mode: 'insensitive' },
              },
              {
                type: category as InvoiceType,
              },
            ],
          }
        : { type: category as InvoiceType },
      include: {
        customer: true,
        invoiceSource: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const total = await prisma.invoice.count({
      where: search
        ? {
            AND: [
              {
                reference: { contains: search, mode: 'insensitive' },
              },
              {
                type: category as InvoiceType,
              },
            ],
          }
        : { type: category as InvoiceType },
    })
    return {
      data: invoices,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }
  async indexByStatus(payload: {
    search?: string
    page: number
    perPage: number
    status?: string
  }): Promise<Meta<Invoice[]>> {
    const { page, perPage, search, status } = payload
    const skip = (page - 1) * perPage
    const invoices = await prisma.invoice.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? {
            AND: [
              {
                reference: { contains: search, mode: 'insensitive' },
              },
              {
                status: status as InvoiceStatus,
              },
            ],
          }
        : { status: status as InvoiceStatus },
      include: {
        customer: true,
        invoiceSource: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const total = await prisma.invoice.count({
      where: search
        ? {
            AND: [
              {
                reference: { contains: search, mode: 'insensitive' },
              },
              {
                status: status as InvoiceStatus,
              },
            ],
          }
        : { status: status as InvoiceStatus },
    })
    return {
      data: invoices,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
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
    return { data: invoice }
  }
  async create(payload: TCreateInvoice): Promise<Meta<Invoice>> {
    const { invoiceItems, emission_date, invoiceId, amount_received, ...rest } =
      payload
    const invoice = await prisma.invoice.create({
      data: {
        emission_date: new Date(),
        amount_received: payload.amount_received,
        invoiceId: payload.invoiceId || null,
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
        ...rest,
      },
    })
    return { data: invoice }
  }
  async filter(search: string): Promise<Meta<Invoice[]>> {
    const invoices = await prisma.invoice.findMany({
      where: {
        AND: [
          {
            reference: { contains: search },
          },
          {
            type: 'FT',
          },
          {
            status: 'POR_PAGAR',
          },
        ],
      },
      include: {
        customer: {
          include: {
            insurance: true,
            protocol: true,
            Partner: true,
          },
        },
        invoiceItems: {
          include: { service: { select: { name: true, description: true } } },
        },
      },
    })

    return { data: invoices }
  }
  async invoiceFromInsurance(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    insuranceId: string,
    statusOfDocument: string
  ): Promise<Meta<Invoice[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage

    const invoices = await prisma.invoice.findMany({
      where: search
        ? {
            AND: [
              {
                reference: { contains: search, mode: 'insensitive' },
              },
              {
                customer: {
                  insuranceId: insuranceId,
                },
              },
              (statusOfDocument as InvoiceStatus) == 'PAGO'
                ? {
                    OR: [
                      {
                        type: 'FR',
                      },
                      {
                        type: 'RC',
                      },
                    ],
                  }
                : {
                    type: 'FT',
                  },
            ],
          }
        : {
            AND: [
              {
                customer: {
                  insuranceId: insuranceId,
                },
              },
              (statusOfDocument as InvoiceStatus) == 'PAGO'
                ? {
                    OR: [
                      {
                        type: 'FR',
                      },
                      {
                        type: 'RC',
                      },
                    ],
                  }
                : {
                    type: 'FT',
                  },
            ],
          },
      include: {
        customer: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.invoice.count({
      where: search
        ? {
            AND: [
              {
                reference: { contains: search, mode: 'insensitive' },
              },
              {
                customer: {
                  insuranceId: insuranceId,
                },
              },
              {
                status: statusOfDocument as InvoiceStatus,
              },
            ],
          }
        : {
            AND: [
              {
                customer: {
                  insuranceId: insuranceId,
                },
              },
              {
                status: statusOfDocument as InvoiceStatus,
              },
            ],
          },
    })
    return {
      data: invoices,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
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
