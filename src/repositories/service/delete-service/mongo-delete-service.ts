import { ObjectId } from 'mongodb'
import { IDeleteServiceRepository } from '../../../controllers/service/delete-service/protocols'
import { MongoClient } from '../../../database/mongo'
import { Service } from '../../../models/Service'

export class MongoDeleteServiceRepository implements IDeleteServiceRepository {
  async deleteService(id: string): Promise<Service> {
    const service = await MongoClient.db
      .collection<Omit<Service, 'id'>>('service')
      .findOne({ _id: new ObjectId(id) })

    if (!service) {
      throw new Error('Service was not found')
    }

    const { deletedCount } = await MongoClient.db
      .collection('service')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) {
      throw new Error('Service was not deleted')
    }

    const { _id, ...rest } = service
    return { id: _id.toHexString(), ...rest }
  }
}
