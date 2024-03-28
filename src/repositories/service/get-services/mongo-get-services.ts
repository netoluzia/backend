import { Filter } from 'mongodb'
import { IGetServicesRepository } from '../../../controllers/service/get-services/protocols'
import { MongoClient } from '../../../database/mongo'
import { Service } from '../../../models/Service'

export class MongoGetServicesRepository implements IGetServicesRepository {
  async getServices(type: string): Promise<Service[]> {
    const services = await MongoClient.db
      .collection<Omit<Service, 'id'>>('service')
      .find({ category: type } as Filter<Omit<Service, 'id'>>)
      .toArray()

    return services.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
