import { ObjectId } from 'mongodb'
import {
  CreateCliente,
  ICreateClientRepository,
} from '../../../controllers/client/create-client/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoCreateClientRepository implements ICreateClientRepository {
  async createClient(params: CreateCliente): Promise<Client> {
    const { insurance_company, ...restData } = params

    const { insertedId } = await MongoClient.db.collection('client').insertOne({
      insurance_company: new ObjectId(insurance_company),
      ...restData,
    })
    const client = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .findOne({ _id: insertedId })
    if (!client) {
      throw new Error('Service was not created')
    }

    const { _id, ...rest } = client

    return { id: _id.toHexString(), ...rest }
  }
}
