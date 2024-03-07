import { ObjectId } from 'mongodb'
import { IGetClientRepository } from '../../../controllers/client/get-client/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoGetClientRepository implements IGetClientRepository {
  async getClient(id: string): Promise<Client> {
    const client = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .findOne({ _id: new ObjectId(id) })

    if (!client) throw new Error('Client was not found')

    const { _id, ...rest } = client
    return { id: _id.toHexString(), ...rest }
  }
}
