import { Filter } from 'mongodb'
import { IGetProductsRepository } from '../../../controllers/product/get-products/protocols'
import { MongoClient } from '../../../database/mongo'
import { Product } from '../../../models/Product'

export class MongoGetProductsRepository implements IGetProductsRepository {
  async getProducts(type: string): Promise<Product[]> {
    const products = await MongoClient.db
      .collection<Omit<Product, 'id'>>('product')
      .find({ category: type } as Filter<Omit<Product, 'id'>>)
      .toArray()

    return products.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
