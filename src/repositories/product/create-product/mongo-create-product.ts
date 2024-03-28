import {
  ICreateProductRepository,
  createProductParams,
} from '../../../controllers/product/create-product/protocols'

import { MongoClient } from '../../../database/mongo'
import { Product } from '../../../models/Product'

export class MongoCreateProductRepository implements ICreateProductRepository {
  async createProduct(params: createProductParams): Promise<Product> {
    const { insertedId } = await MongoClient.db
      .collection('product')
      .insertOne(params)
    const product = await MongoClient.db
      .collection<Omit<Product, 'id'>>('product')
      .findOne({ _id: insertedId })

    if (!product) {
      throw new Error('product was not saved')
    }

    const { _id, ...rest } = product

    return { id: _id.toHexString(), ...rest }
  }
}
