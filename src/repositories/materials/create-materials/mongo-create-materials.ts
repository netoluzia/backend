import { ObjectId } from 'mongodb'
import {
  CreateStockMaterial,
  ICreateStockMaterialRepository,
} from '../../../controllers/materials/create-materials/protocols'
import { MongoClient } from '../../../database/mongo'
import { Logs } from '../../../models/Logs'
import { Stock } from '../../../models/Stock'
import { MongoAddStockRepository } from '../add-stock/mongo-add-stock'

export class MongoCreateStockMaterialRepository
  implements ICreateStockMaterialRepository
{
  private readonly repository = new MongoAddStockRepository()
  async createStockMaterial(params: CreateStockMaterial): Promise<Stock> {
    console.log(params)
    const { insertedId } = await MongoClient.db
      .collection('material')
      .insertOne({
        createdAt: new Date(),
        ...params,
        startQuantity: params.quantity,
      })
    const material = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .findOne({ _id: insertedId })

    if (!material) {
      throw new Error('Material não foi guardada')
    }

    await this.repository.addStock({
      material: material._id.toHexString(),
      quantity: params.quantity,
      type: 'ENTRADA',
      stockInitial: params.quantity,
    })

    const { _id, ...rest } = material

    return { id: _id.toHexString(), ...rest }
  }
}
