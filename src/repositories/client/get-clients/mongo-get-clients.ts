import { IGetClientsRepository } from '../../../controllers/client/get-clients/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoGetClientsRepository implements IGetClientsRepository {
  async getClients(): Promise<Client[] | any> {
    const pipeline = [
      {
        $lookup: {
          from: 'insurance',
          localField: 'insurance_company',
          foreignField: '_id',
          as: 'insurance_data',
        },
      },
      {
        $unwind: {
          path: '$insurance_data',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone_number: 1,
          insurance_number: 1,
          createdAt: 1,
          insurance_company: '$insurance_data',
        },
      },
    ]
    const clients = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .aggregate(pipeline)
      // .find()
      .toArray()
    return clients.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
