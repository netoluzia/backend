import { ObjectId } from 'mongodb'
import { IGetMaterialFromServiceRepository } from '../../../controllers/service/get-material-from-service/protocols'
import { MongoClient } from '../../../database/mongo'
import { Stock } from '../../../models/Stock'

export class MongoGetMaterialFormServiceRepository
  implements IGetMaterialFromServiceRepository
{
  async getMaterialFromService(id: string): Promise<Stock | any> {
    const material = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('service')
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $unwind: '$material',
        },
        {
          $lookup: {
            from: 'material',
            localField: 'material.material',
            foreignField: '_id',
            as: 'materialDetails',
          },
        },
        {
          $unwind: '$materialDetails',
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            description: { $first: '$description' },
            net_price: { $first: '$net_price' },
            category: { $first: '$category' },
            type: { $first: '$type' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
            materials: {
              $push: {
                materialId: '$material.material',
                quantity: '$material.qtd',
                materialDetails: '$materialDetails',
              },
            },
          },
        },
      ])
      .toArray()

    return material[0]
  }
}
