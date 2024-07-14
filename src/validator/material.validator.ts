import { Category, Measure } from '@prisma/client'
import { z } from 'zod'
export const createExpendableMaterial = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.enum([
    Category.ECO,
    Category.ENF,
    Category.ESP,
    Category.EST,
    Category.FAR,
    Category.LAB,
    Category.RX,
  ]),
  measure: z.enum([
    Measure.Unidade,
    Measure.Litro,
    Measure.Mililitro,
    Measure.Par,
  ]),
})

export type TCreateExpendableMaterial = z.infer<typeof createExpendableMaterial>

export const updateExpendableMaterial = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z
    .enum([
      Category.ECO,
      Category.ENF,
      Category.ESP,
      Category.EST,
      Category.FAR,
      Category.LAB,
      Category.RX,
    ])
    .optional(),
  measure: z
    .enum([Measure.Unidade, Measure.Litro, Measure.Mililitro, Measure.Par])
    .optional(),
  quantity: z.number().optional(),
})

export type TUpdateExpendableMaterial = z.infer<typeof updateExpendableMaterial>
