import { IGetStockMaterialsRepository } from '../../../controllers/materials/get-materials/protocols'
import { MongoClient } from '../../../database/mongo'
import { Stock } from '../../../models/Stock'

export class MongoGetStockMaterialsRepository
  implements IGetStockMaterialsRepository
{
  async getStockMaterial(): Promise<Stock[]> {
    const materials = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .find({})
      .toArray()
    return materials.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
