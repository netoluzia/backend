import { IGetReportFinancialRepository } from '../../controllers/reports/protocols'
import { MongoClient } from '../../database/mongo'

export class MongoGetReportFinancialRepository
  implements IGetReportFinancialRepository
{
  async getReportFinancial(params: any): Promise<any> {
    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(params.range.$gte),
          },
          paid: params.paid,
        },
      },
      {
        $lookup: {
          from: 'client', // Nome da coleção de clientes
          localField: 'client', // Campo local que faz referência ao _id do cliente
          foreignField: '_id', // Campo na coleção de clientes que corresponde ao campo local
          as: 'clientData', // Nome do novo campo que conterá os dados do cliente
        },
      },
      {
        $unwind: '$clientData', // Desnormaliza o array criado pelo $lookup para ter um documento por cliente
      },
      {
        $lookup: {
          from: 'user', // Nome da coleção de attendants
          localField: 'attendant', // Campo local que faz referência ao _id do attendant
          foreignField: '_id', // Campo na coleção de attendants que corresponde ao campo local
          as: 'attendantData', // Nome do novo campo que conterá os dados do attendant
        },
      },
      {
        $unwind: '$attendantData', // Desnormaliza o array criado pelo $lookup para ter um documento por attendant
      },
    ]

    const documents = await MongoClient.db
      .collection('document')
      .aggregate(pipeline)
      .toArray()

    const response = {
      toPay: 0,
      paid: 0,
      documents,
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
