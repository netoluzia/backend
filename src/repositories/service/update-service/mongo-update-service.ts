import { ObjectId } from 'mongodb'
import { createServiceParams } from '../../../controllers/service/create-service/protocols'
import { IUpdateServiceRepository } from '../../../controllers/service/update-service/protocols'
import { MongoClient } from '../../../database/mongo'
import { Service } from '../../../models/Service'

export class MongoUpdateServiceRepository implements IUpdateServiceRepository {
  async updateService(
    id: string,
    params: createServiceParams
  ): Promise<Service> {
    const service = await MongoClient.db
      .collection<Omit<Service, 'id'>>('service')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...params } },
        { returnDocument: 'after' }
      )

    if (!service) {
      throw new Error('Service not found')
    }
    const { _id, ...rest } = service
    return { id: _id.toHexString(), ...rest }
  }
}
