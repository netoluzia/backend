import { ObjectId } from 'mongodb'
import { IGetProductRepository } from '../../../controllers/product/get-product/protocols'
import { MongoClient } from '../../../database/mongo'
import { Product } from '../../../models/Product'

export class MongoGetProductRepository implements IGetProductRepository {
  async getProduct(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<Omit<Product, 'id'>>('product')
      .findOne({ _id: new ObjectId(id) })

    if (!product) {
      throw new Error('Product was not found')
    }

    const { _id, ...rest } = product
    return { id: _id.toHexString(), ...rest }
  }
}
