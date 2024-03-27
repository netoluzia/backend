import {
  CreateAttending,
  CreatingAttending,
  ICreateAttendingRepository,
} from '../../../controllers/attending/create-attending/protocols'
import { MongoClient } from '../../../database/mongo'
import { Attending } from '../../../models/Attending'

export class MongoCreateAttendingRepository
  implements ICreateAttendingRepository
{
  async createAttending(params: CreatingAttending): Promise<Attending | any> {
    const { insertedId } = await MongoClient.db
      .collection('attending')
      .insertOne({ ...params, createdAt: new Date(), updatedAt: new Date() })
    if (!insertedId) {
      throw new Error('Atendimento não foi registrado')
    }
    const attending = await MongoClient.db
      .collection<Omit<Attending, 'id'>>('attending')
      .aggregate([
        {
          $match: {
            _id: insertedId,
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
          },
        },
      ])
      .toArray()
    const { _id, ...rest } = attending[0]
    return { id: _id.toHexString(), ...rest }
  }
}
