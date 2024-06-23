import { ObjectId } from 'mongodb'
import {
  IAttachMaterialServiceRepository,
  Material,
} from '../../../controllers/service/attach-material/protocols'
import { MongoClient } from '../../../database/mongo'
import { Service } from '../../../models/Service'

export class MongoAttachMaterialRepository
  implements IAttachMaterialServiceRepository
{
  async attachMaterial(id: string, material: Material[]): Promise<Service> {
    const newMaterial = material.map(({ material, qtd }) => ({
      material: new ObjectId(material),
      qtd,
    }))

    const service = await MongoClient.db
      .collection<Omit<Service, 'id'>>('service')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { material: newMaterial } },
        { returnDocument: 'after' }
      )
    if (!service) throw new Error('Something went wrong')
    const { _id, ...rest } = service
    return { id: _id.toHexString(), ...rest }
  }
}
