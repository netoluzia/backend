import { IGetDocumentsByTypeRepository } from '../../../controllers/document/get-documents/protocols'
import { MongoClient } from '../../../database/mongo'

export class MongoGetDocumentsByTypeRepository
  implements IGetDocumentsByTypeRepository
{
  async getDocumentsByType(): Promise<any[]> {
    const pipeline = [
      {
        $match: {
          paid: false,
        },
      },
      {
        $lookup: {
          from: 'client',
          localField: 'client',
          foreignField: '_id',
          as: 'client_data',
        },
      },
      {
        $unwind: {
          path: '$client_data',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          document: 1,
          total: 1,
          reference: 1,
          emission_date: 1,
          items: 1,
          client: '$client_data',
        },
      },
    ]

    const documents = await MongoClient.db
      .collection('document')
      .aggregate(pipeline)
      .toArray()

    if (!documents) throw new Error('Houve um erro')

    return documents.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
