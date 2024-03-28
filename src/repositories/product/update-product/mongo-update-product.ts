import { ObjectId } from 'mongodb'
import { IUpdateProductRepository } from '../../../controllers/product/update-product/protocols'
import { MongoClient } from '../../../database/mongo'
import { Product } from '../../../models/Product'

export class MongoUpdateProductRepository implements IUpdateProductRepository {
  async updateProduct(id: string, params: Product): Promise<Product> {
    const product = await MongoClient.db
      .collection<Omit<Product, 'id'>>('product')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...params } },
        { returnDocument: 'after' }
      )

    if (!product) {
      throw new Error('Product not found')
    }
    const { _id, ...rest } = product
    return { id: _id.toHexString(), ...rest }
  }
}
