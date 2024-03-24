import { IGetAtendingsRepository } from '../../../controllers/attending/get-attendings/protocols'
import { MongoClient } from '../../../database/mongo'
import { Attending } from '../../../models/Attending'

export class MongoGetAttendingsRepository implements IGetAtendingsRepository {
  async getAttendings(): Promise<any> {
    const attendings = await MongoClient.db
      .collection<Omit<Attending, 'id'>>('attending')
      .aggregate([
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
          },
        },
      ])
      .toArray()

    return attendings.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
