import { Category, StatusService, TypeItem } from '@prisma/client'
import { z } from 'zod'
export const createService = z.object({
  name: z.string(),
  unit_price: z.number(),
  // sale_price: z.number().optional(),
  tax: z.number().optional(),
  hasIva: z.boolean().optional(),
  category: z.enum([
    Category.ECO,
    Category.ENF,
    Category.ESP,
    Category.EST,
    Category.FAR,
    Category.LAB,
    Category.RX,
  ]),
  type: z.enum([TypeItem.PRODUCT, TypeItem.SERVICE]),
  account_code: z.string().optional(),
  status: z
    .enum([StatusService.AVAILABLE, StatusService.UNAVAILABE])
    .optional(),
  description: z.string(),
  discount: z.number().optional(),
  exemptionCode: z.string().optional(),
  materials: z
    .array(z.object({ expendableMaterialId: z.string(), quantity: z.number() }))
    .optional(),
})

export type TCreateService = z.infer<typeof createService>

export const updateService = z.object({
  name: z.string().optional(),
  unit_price: z.number().optional(),
  // sale_price: z.number().optional(),
  tax: z.number().optional(),
  hasIva: z.boolean().optional(),
  category: z.enum([
    Category.ECO,
    Category.ENF,
    Category.ESP,
    Category.EST,
    Category.FAR,
    Category.LAB,
    Category.RX,
  ]),
  type: z.enum([TypeItem.PRODUCT, TypeItem.SERVICE]),
  account_code: z.string().optional(),
  status: z
    .enum([StatusService.AVAILABLE, StatusService.UNAVAILABE])
    .optional(),
  description: z.string().optional(),
  discount: z.number().optional(),
  exemptionCode: z.string().optional(),
  materials: z
    .array(z.object({ expendableMaterialId: z.string(), quantity: z.number() }))
    .optional(),
})

export type TUpdateService = z.infer<typeof updateService>
