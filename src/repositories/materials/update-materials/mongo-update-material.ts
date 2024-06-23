import { ObjectId } from 'mongodb'
import { MongoClient } from '../../../database/mongo'
import {
  IUpdateStockMaterialRepository,
  UpdateStockMaterial,
} from '../../../controllers/materials/update-materials/protocols'
import { Stock } from '../../../models/Stock'

export class MongoUpdateStockMaterialRepository
  implements IUpdateStockMaterialRepository
{
  async updateStockMaterial(
    id: string,
    payload: UpdateStockMaterial
  ): Promise<Stock> {
    const updatedInsurance = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
          },
        },
        {
          returnDocument: 'after',
        }
      )
    if (!updatedInsurance) throw new Error('i=Insurance was not updated')
    const { _id, ...rest } = updatedInsurance

    return { id: _id.toHexString(), ...rest }
  }
}
