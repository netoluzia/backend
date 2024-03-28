import { ObjectId } from 'mongodb'
import { IDeleteProductRepository } from '../../../controllers/product/delete-product/protocols'
import { MongoClient } from '../../../database/mongo'
import { Product } from '../../../models/Product'

export class MongoDeleteProductRepository implements IDeleteProductRepository {
  async deleteProduct(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<Omit<Product, 'id'>>('product')
      .findOne({ _id: new ObjectId(id) })

    if (!product) {
      throw new Error('Product was not found')
    }

    const { deletedCount } = await MongoClient.db
      .collection('product')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) {
      throw new Error('Product was not deleted')
    }

    const { _id, ...rest } = product
    return { id: _id.toHexString(), ...rest }
  }
}
