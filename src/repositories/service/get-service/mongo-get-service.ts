import { ObjectId } from 'mongodb'
import { IGetServiceRepository } from '../../../controllers/service/get-service/protocols'
import { MongoClient } from '../../../database/mongo'
import { Service } from '../../../models/Service'

export class MongoGetServiceRepository implements IGetServiceRepository {
  async getService(id: string): Promise<Service> {
    const service = await MongoClient.db
      .collection<Omit<Service, 'id'>>('service')
      .findOne({ _id: new ObjectId(id) })

    if (!service) {
      throw new Error('Service was not found')
    }

    const { _id, ...rest } = service
    return { id: _id.toHexString(), ...rest }
  }
}
