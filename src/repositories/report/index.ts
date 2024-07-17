import { prisma } from '../../database/prisma'
import { IReportRepository } from '../../types/report.interface'

export class ReportRepository implements IReportRepository {
  async receiptByArea(): Promise<any> {
    const reports = await prisma.invoiceItem.findMany({
      where: {
        invoice: {
          status: 'PAGO',
        },
      },
      include: {
        service: { select: { category: true } },
      },
    })

    const groupedSums = reports.reduce((acc: any, item: any) => {
      const category = item.service.category
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += item.total // Soma o campo total de cada item
      return acc
    }, {})

    const result = Object.entries(groupedSums).map(([category, total]) => ({
      category,
      total,
    }))
  }
}
