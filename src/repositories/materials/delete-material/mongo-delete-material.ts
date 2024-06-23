import { ObjectId } from 'mongodb'
import { MongoClient } from '../../../database/mongo'
import { IDeleteStockMaterialRepository } from '../../../controllers/materials/delete-material/protocols'
import { Stock } from '../../../models/Stock'

export class MongoDeleteStockMaterialRepository
  implements IDeleteStockMaterialRepository
{
  async deleteStockMaterial(id: string): Promise<Stock> {
    const material = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .findOne({ _id: new ObjectId(id) })

    if (!material) throw new Error('Method not implemented.')
    const { deletedCount } = await MongoClient.db
      .collection('material')
      .deleteOne({ _id: new ObjectId(id) })
    if (!deletedCount) throw new Error('material was not found')
    const { _id, ...rest } = material

    return { id: _id.toHexString(), ...rest }
  }
}
