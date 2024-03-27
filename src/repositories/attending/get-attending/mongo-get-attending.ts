import { ObjectId } from 'mongodb'
import { IGetAttendingRepository } from '../../../controllers/attending/get-attending/protocols'
import { MongoClient } from '../../../database/mongo'

export class MongoGetAttendingRepository implements IGetAttendingRepository {
  async getAttending(id: string): Promise<any> {
    const attending = await MongoClient.db
      .collection('attending')
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'client',
            localField: 'client',
            foreignField: '_id',
            as: 'client_data',
          },
        },
        {
          $unwind: {
            path: '$client_data',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            client: '$client_data',
            patient: 1,
          },
        },
      ])
      .toArray()
    const { _id, ...rest } = attending[0]
    return { id: _id.toHexString(), ...rest }
  }
}
