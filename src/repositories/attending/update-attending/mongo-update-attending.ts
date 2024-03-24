import { ObjectId } from 'mongodb'
import {
  CreateAttending,
  UpdateAttending,
} from '../../../controllers/attending/create-attending/protocols'
import { IUpdateAttendingRepository } from '../../../controllers/attending/update-attending/protocols'
import { MongoClient } from '../../../database/mongo'
import { Attending } from '../../../models/Attending'

export class MongoUpdateAttendingRepository
  implements IUpdateAttendingRepository
{
  async updateAttending(
    id: string,
    params: UpdateAttending
  ): Promise<Attending | any> {
    const { ...payload } = params
    const attending = await MongoClient.db
      .collection('attending')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
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
