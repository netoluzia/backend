import { IGetClientsRepository } from '../../../controllers/client/get-clients/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoGetClientsRepository implements IGetClientsRepository {
  async getClients(): Promise<Client[]> {
    const clients = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .find({})
      .toArray()

    return clients.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
