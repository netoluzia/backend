import { ISearchStockMaterialsRepository } from '../../../controllers/materials/search-material/protocols'
import { MongoClient } from '../../../database/mongo'
import { Stock } from '../../../models/Stock'

export class MongoSearchStockMaterial
  implements ISearchStockMaterialsRepository
{
  async searchStockMaterial(name: string): Promise<Stock[]> {
    const stock = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .find({ name: { $regex: name, $options: 'i' } })
      .toArray()
    return stock.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
