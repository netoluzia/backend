import { ObjectId } from 'mongodb'
import { CreateAttending } from '../../../controllers/attending/create-attending/protocols'
import { IUpdateAttendingRepository } from '../../../controllers/attending/update-attending/protocols'
import { MongoClient } from '../../../database/mongo'
import { Attending } from '../../../models/Attending'

export class MongoUpdateAttendingRepository
  implements IUpdateAttendingRepository
{
  async updateAttending(
    id: string,
    params: CreateAttending
  ): Promise<Attending> {
    const { items, ...payload } = params
    const attending = await MongoClient.db
      .collection<Omit<Attending, 'id'>>('attending')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
          },
          $push: {
            items: { $each: items },
          },
        },
        { returnDocument: 'after' }
      )

    if (!attending) {
      throw new Error('Erro ao registar dados. Tente novamente')
    }

    const { _id, ...rest } = attending

    return { id: _id.toHexString(), ...rest }
  }
}
