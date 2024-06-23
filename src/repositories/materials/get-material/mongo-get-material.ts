import { ObjectId } from 'mongodb'
import { MongoClient } from '../../../database/mongo'
import { IGetStockMaterialRepository } from '../../../controllers/materials/get-material/protocols'
import { Stock } from '../../../models/Stock'

export class MongoGetStockMaterialRepository
  implements IGetStockMaterialRepository
{
  async getStockMaterial(id: string): Promise<Stock> {
    const material = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .findOne({ _id: new ObjectId(id) })

    if (!material) throw new Error('material not found')

    const { _id, ...rest } = material
    return { id: _id.toHexString(), ...rest }
  }
}
