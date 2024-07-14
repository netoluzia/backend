import { Transaction } from '@prisma/client'
import { ITransactionRepository } from '../../types/transaction.interface'
import { prisma } from '../../database/prisma'

export class TransactionRepository implements ITransactionRepository {
  async addStock(id: string, amount: number): Promise<Transaction> {
    const stock = await prisma.expendableMaterial.findUnique({ where: { id } })

    if (stock) {
      await prisma.expendableMaterial.update({
        where: { id },
        data: {
          quantity: stock.quantity + amount,
        },
      })
    }

    const transaction = await prisma.transaction.create({
      data: {
        quantity: amount,
        type: 'ADD',
        expendableMaterialId: id,
      },
    })

    return transaction
  }
  async subtractStock(id: string, amount: number): Promise<Transaction> {
    const stock = await prisma.expendableMaterial.findUnique({ where: { id } })

    if (stock) {
      await prisma.expendableMaterial.update({
        where: { id },
        data: {
          quantity: stock.quantity - amount,
        },
      })
    }

    const transaction = await prisma.transaction.create({
      data: {
        quantity: amount,
        type: 'SUBTRACT',
        expendableMaterialId: id,
      },
    })

    return transaction
  }
  async reportMonthly(month: number, year: number): Promise<any> {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    const report: any = {}

    transactions.forEach((transaction) => {
      const { expendableMaterialId, type, quantity } = transaction

      if (!report[expendableMaterialId]) {
        report[expendableMaterialId] = { initialStock: 0, finalStock: 0 }
      }

      if (type === 'ADD') {
        report[expendableMaterialId].finalStock += quantity
      } else if (type === 'SUBTRACT') {
        report[expendableMaterialId].finalStock -= quantity
      }
    })

    for (const expendableMaterialId in report) {
      const initialStock = await prisma.expendableMaterial.findUnique({
        where: { id: expendableMaterialId },
      })

      report[expendableMaterialId].initialStock = initialStock
        ? initialStock.quantity - report[expendableMaterialId].finalStock
        : 0
    }

    return report
  }
}
