import { ObjectId } from 'mongodb'
import { IDeleteClientRepository } from '../../../controllers/client/delete-client/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoDeleteClientRepository implements IDeleteClientRepository {
  async deleteClient(id: string): Promise<Client> {
    const client = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .findOne({ _id: new ObjectId(id) })
    if (!client) throw new Error('Client was not found')
    const { deletedCount } = await MongoClient.db
      .collection('client')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) throw new Error('Client was not deleted')

    const { _id, ...rest } = client
    return { id: _id.toHexString(), ...rest }
  }
}
