import { IGetReportFinancialRepository } from '../../controllers/reports/protocols'
import { MongoClient } from '../../database/mongo'

export class MongoGetReportFinancialRepository
  implements IGetReportFinancialRepository
{
  async getReportFinancial(params: any): Promise<any> {
    const documents = await MongoClient.db
      .collection('document')
      .find({
        emission_date: {
          $gte: new Date(params.range.$gte),
        },
      })
      .toArray()
    const response = {
      toPay: 0,
      paid: 0,
    }
    documents.forEach((item) => {
      if (item.paid) {
        response.paid += item.total
      } else {
        response.toPay += item.total
      }
    })

    return response
  }
}
