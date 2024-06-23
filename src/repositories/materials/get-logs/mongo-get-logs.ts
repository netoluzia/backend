import { ObjectId } from 'mongodb'
import { IGetLogsRepository } from '../../../controllers/materials/stock-logs/protocols'
import { MongoClient } from '../../../database/mongo'
import { Stock } from '../../../models/Stock'
import { Logs } from '../../../models/Logs'

export class MongoGetLogsRepository implements IGetLogsRepository {
  async getLogs(params: { month: number; year: number }): Promise<any> {
    const data = await MongoClient.db
      .collection<Logs>('stock-logs')
      .aggregate([
        {
          $project: {
            idMaterial: 1,
            quantity: 1,
            type: 1,
            stockInitial: 1,
            stockFinal: 1,
            day: { $dayOfMonth: '$createdAt' },
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
        },
        {
          $match: {
            month: params.month,
            year: params.year,
          },
        },
        {
          $group: {
            _id: '$idMaterial',
            operations: {
              $push: {
                id: '$_id',
                type: '$type',
                quantity: '$quantity',
                day: '$day',
                stockInitial: '$stockInitial',
                stockFinal: '$stockFinal',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'material',
            localField: '_id',
            foreignField: '_id',
            as: 'materialDetails',
          },
        },
        {
          $unwind: '$materialDetails',
        },
        {
          $project: {
            idMaterial: '$_id',
            operations: 1,
            materialName: '$materialDetails.name',
            materialPrice: '$materialDetails.price',
            materialCategory: '$materialDetails.category',
            materialStockMin: '$materialDetails.min_quantity',
          },
        },
      ])
      .toArray()

    return data
  }
  async getInitialStock(id: ObjectId): Promise<number> {
    const now = new Date()

    return 4
  }
}
