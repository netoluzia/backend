import { IReportPerMonthRepository } from '../../../controllers/dashboard/report-per-month/protocols'
import { MongoClient } from '../../../database/mongo'

export class MongoGetReportPerMonth implements IReportPerMonthRepository {
  async reportPerMonth(): Promise<any> {
    const pipeline = [
      {
        $match: {
          paid: true, // Filtra apenas os documentos pagos
        },
      },
      {
        $project: {
          month: { $month: '$emission_date' }, // Extrai o mês da data de emissão
          total: '$total', // Seleciona o campo total para os documentos
        },
      },
      {
        $group: {
          _id: '$month', // Agrupa pelos meses
          total: { $sum: '$total' }, // Soma os totais para cada mês
        },
      },
      {
        $addFields: {
          month: '$_id', // Renomeia o campo _id para month
        },
      },
      {
        $sort: {
          month: 1, // Ordena pelo mês
        },
      },
    ]

    const result = await MongoClient.db
      .collection('document')
      .aggregate(pipeline)
      .toArray()

    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1)

    const finalResult = allMonths.map((month) => {
      const existingMonth = result.find((item) => item.month === month)
      return existingMonth || { month, total: null }
    })

    return finalResult
  }
}
