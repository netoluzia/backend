import { ObjectId } from 'mongodb'
import { CreateCliente } from '../../../controllers/client/create-client/protocols'
import { IUpdateClientRepository } from '../../../controllers/client/update-client/protocols'
import { MongoClient } from '../../../database/mongo'
import { Client } from '../../../models/Client'

export class MongoUpdateClientRepository implements IUpdateClientRepository {
  async updateClient(id: string, params: CreateCliente): Promise<Client> {
    const { insurance_company, ...restParams } = params
    console.log(restParams)
    const updatedClient = await MongoClient.db
      .collection<Omit<Client, 'id'>>('client')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            updatedAt: new Date(),
            ...restParams,
            insurance_company: insurance_company
              ? (new ObjectId(String(insurance_company)) as unknown as string)
              : undefined,
          },
        },
        { returnDocument: 'after' }
      )

    if (!updatedClient) {
      throw new Error('Client was not updated')
    }

    const { _id, ...rest } = updatedClient

    return { id: _id.toHexString(), ...rest }
  }
}
