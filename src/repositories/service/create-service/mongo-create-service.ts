import {
  ICreateServicesRepository,
  createServiceParams,
} from '../../../controllers/service/create-service/protocols'
import { MongoClient } from '../../../database/mongo'
import { Service } from '../../../models/Service'

export class MongoCreateServiceRepository implements ICreateServicesRepository {
  async createService(params: createServiceParams): Promise<Service> {
    const { insertedId } = await MongoClient.db
      .collection('service')
      .insertOne(params)
    const service = await MongoClient.db
      .collection<Omit<Service, 'id'>>('service')
      .findOne({ _id: insertedId })

    if (!service) {
      throw new Error('Service was not saved')
    }

    const { _id, ...rest } = service

    return { id: _id.toHexString(), ...rest }
  }
}
