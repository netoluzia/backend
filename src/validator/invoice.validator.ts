import { InvoiceStatus, InvoiceType } from '@prisma/client'
import { z } from 'zod'
export const createInvoice = z.object({
  customerId: z.string().optional(),
  type: z.enum([
    InvoiceType.FR,
    InvoiceType.FT,
    InvoiceType.NC,
    InvoiceType.ND,
    InvoiceType.PP,
    InvoiceType.RC,
  ]),
  paymentId: z.string().optional().nullable(),
  reasonInssuance: z.string().optional(),
  invoiceId: z.string().optional().nullable(),
  emission_date: z.string().optional().nullable(),
  invoiceItems: z
    .array(
      z.object({
        serviceId: z.string(),
        quantity: z.number(),
        discount: z.number(),
        price: z.number(),
        total: z.number(),
      })
    )
    .optional(),
  amount_received: z.number().optional(),
  hash64: z.string(),
  hash4: z.string(),
  total: z.number().optional(),
  discount: z.number().optional(),
  userId: z.string(),
  serie: z.string(),
  reference: z.string(),
  status: z.enum([
    InvoiceStatus.PAGO,
    InvoiceStatus.POR_PAGAR,
    InvoiceStatus.FINAL,
  ]),
})

export type TCreateInvoice = z.infer<typeof createInvoice>

export const updateInvoice = z.object({
  customerId: z.string(),
  type: z.enum([
    InvoiceType.FR,
    InvoiceType.FT,
    InvoiceType.NC,
    InvoiceType.ND,
    InvoiceType.PP,
    InvoiceType.RC,
  ]),
  amount_received: z.number().optional(),
  paymentId: z.string().optional(),
  reasonInssuance: z.string().optional(),
  invoiceId: z.string().optional(),
  emission_date: z.string().optional(),
  invoiceItems: z.array(
    z.object({
      serviceId: z.string(),
      quantity: z.number(),
      discount: z.number(),
      total: z.number(),
    })
  ),
})

export type TUpdateInvoice = z.infer<typeof updateInvoice>
