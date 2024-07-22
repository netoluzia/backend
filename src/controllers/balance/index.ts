import { prisma } from '../../database/prisma'
type Service = {
  category: string
}

type InvoiceItem = {
  service: Service
  total: number
}

type Invoice = {
  invoiceItems: InvoiceItem[]
}

type CategoryTotal = {
  category: string
  total: number
}

export class BalanceController {
  aggregateInvoiceCategories(invoices: Invoice[]): CategoryTotal[] {
    const categoryMap: { [key: string]: number } = {}

    for (const invoice of invoices) {
      for (const item of invoice.invoiceItems) {
        const category = item.service.category
        const total = item.total

        if (categoryMap[category]) {
          categoryMap[category] += total
        } else {
          categoryMap[category] = total
        }
      }
    }
    const categories: any = {
      FAR: 'Farmácia',
      LAB: 'Laboratório',
      ESP: 'Especialidade',
      ECO: 'Ecografia',
      RX: 'Raio-X',
      EST: 'Estomatologia',
      ENF: 'Enfermaria',
    }
    const result: CategoryTotal[] = []
    for (const category in categoryMap) {
      if (categoryMap.hasOwnProperty(category)) {
        result.push({
          category: categories[category],
          total: categoryMap[category],
        })
      }
    }

    return result
  }

  getDayRange(
    year: number,
    month: number,
    day: number
  ): { start: Date; end: Date } {
    const start = new Date(year, month - 1, day, 0, 0, 0, 0)
    const end = new Date(year, month - 1, day, 23, 59, 59, 999)
    return { start, end }
  }

  getMonthRange(year: number, month: number): { start: Date; end: Date } {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59, 999)
    return { start, end }
  }
  async show(type: string, range: string) {
    try {
      const [year, month, day] = range.split('-')
      const { start, end } =
        type == 'month'
          ? this.getMonthRange(Number(year), Number(month))
          : this.getDayRange(Number(year), Number(month), Number(day))
      const invoices = await prisma.invoice.findMany({
        where: {
          emission_date: {
            gte: start,
            lte: end,
          },
          OR: [
            {
              type: 'FR',
            },
            {
              type: 'RC',
            },
          ],
        },
        select: {
          invoiceItems: {
            select: {
              service: {
                select: { category: true },
              },
              total: true,
            },
          },
        },
      })
      const result = this.aggregateInvoiceCategories(invoices)
      return result
    } catch (error: any) {
      console.log(error.message)
    }
  }
}
