import { ObjectId } from 'mongodb'
import { CreateCliente } from '../../../controllers/client/create-client/protocols'
import { IUpdateClientRepository } from '../../../controllers/client/update-client/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoUpdateClientRepository implements IUpdateClientRepository {
  async updateClient(id: string, params: CreateCliente): Promise<Client> {
    const client = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...params, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!client) {
      throw new Error('Client was not updated')
    }
    const { _id, ...rest } = client
    return { id: _id.toHexString(), ...rest }
  }
}
