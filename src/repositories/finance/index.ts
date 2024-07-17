import { prisma } from '../../database/prisma'
import { IFinanceRepository } from '../../types/finance.interface'

export class FinanceRepository implements IFinanceRepository {
  async receipt(): Promise<{ toReceive: number; received: number }> {
    const toReceive = await prisma.invoice.aggregate({
      where: { AND: [{ status: 'POR_PAGAR' }, { type: 'FT' }] },
      _sum: {
        total: true,
      },
    })
    const received = await prisma.invoice.aggregate({
      where: { status: 'PAGO', OR: [{ type: 'FR' }, { type: 'RC' }] },
      _sum: {
        total: true,
      },
    })
    return {
      toReceive: toReceive?._sum.total || 0,
      received: received?._sum.total || 0,
    }
  }
}
