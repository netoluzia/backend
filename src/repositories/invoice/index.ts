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
        invoiceSource: {
          include: {
            customer: { select: { name: true } },
          },
        },
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
              status == 'PAGO'
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
                    status: status as InvoiceStatus,
                  },
            ],
          }
        : {
            AND: [
              status == 'PAGO'
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
                    status: status as InvoiceStatus,
                  },
            ],
          },
      include: {
        customer: true,
        invoiceSource: {
          include: {
            customer: { select: { name: true } },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const total = await prisma.invoice.count({
      where: {
        AND: [
          status == 'PAGO'
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
                status: status as InvoiceStatus,
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
  async show(id: string): Promise<Meta<Invoice>> {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: { include: { service: true } },
        customer: {
          include: { insurance: true, Partner: true, protocol: true },
        },
        payment: true,
        user: true,
        invoiceSource: {
          include: {
            customer: {
              include: { insurance: true, Partner: true, protocol: true },
            },

            invoiceItems: { include: { service: true } },
          },
        },
      },
    })
    return { data: invoice }
  }
  async create(payload: TCreateInvoice): Promise<Meta<Invoice>> {
    const { invoiceItems, emission_date, invoiceId, amount_received, ...rest } =
      payload
    let invoice: Invoice
    if (
      invoiceItems?.length &&
      (payload.type == 'FR' || payload.type == 'FT' || payload.type == 'PP')
    ) {
      invoice = await prisma.invoice.create({
        data: {
          emission_date: payload.emission_date
            ? new Date(payload.emission_date)
            : new Date(),
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
    } else if (payload.type == 'ND') {
      invoice = await prisma.invoice.create({
        data: {
          emission_date: payload.emission_date
            ? new Date(payload.emission_date)
            : new Date(),
          invoiceId: payload.invoiceId || null,
          ...rest,
        },
      })
      if (invoiceId)
        await prisma.invoice.update({
          where: { id: invoiceId },
          data: {
            status: 'FINAL',
          },
        })
    } else {
      invoice = await prisma.invoice.create({
        data: {
          emission_date: payload.emission_date
            ? new Date(payload.emission_date)
            : new Date(),
          ...rest,
          invoiceId,
          amount_received,
        },
        include: {
          invoiceSource: true,
        },
      })
      if (invoiceId)
        await prisma.invoice.update({
          where: { id: invoiceId },
          data: {
            status: payload.type == 'RC' ? 'PAGO' : 'FINAL',
          },
        })
    }
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
      take: perPage,
      skip: skip,
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
  async invoiceFromInsuranceTotal(
    insuranceId: string,
    statusOfDocument: string
  ): Promise<Meta<number | null>> {
    const invoices = await prisma.invoice.aggregate({
      where: {
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
      _sum: {
        total: true,
      },
    })

    return {
      data: invoices._sum.total,
    }
  }
  async invoiceFromCustomer(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    customerId: string,
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
                customerId,
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
                    AND: [
                      {
                        type: 'FT',
                      },
                      {
                        status: 'POR_PAGAR',
                      },
                    ],
                  },
            ],
          }
        : {
            AND: [
              {
                customerId,
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
                    AND: [
                      {
                        type: 'FT',
                      },
                      {
                        status: 'POR_PAGAR',
                      },
                    ],
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
                customerId,
              },
              {
                status: statusOfDocument as InvoiceStatus,
              },
            ],
          }
        : {
            AND: [
              {
                customerId,
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
