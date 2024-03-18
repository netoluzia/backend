import {
  CreateAttending,
  ICreateAttendingRepository,
} from '../../../controllers/attending/create-attending/protocols'
import { MongoClient } from '../../../database/mongo'
import { Attending } from '../../../models/Attending'

export class MongoCreateAttendingRepository
  implements ICreateAttendingRepository
{
  async createAttending(params: CreateAttending): Promise<Attending> {
    const { insertedId } = await MongoClient.db
      .collection('attending')
      .insertOne({ ...params, createdAt: new Date(), updatedAt: new Date() })
    if (!insertedId) {
      throw new Error('Atendimento não foi registrado')
    }
    const attending = await MongoClient.db
      .collection<Omit<Attending, 'id'>>('attending')
      .findOne({ _id: insertedId })

    if (!attending) {
      throw new Error('Atendimento não foi registrado')
    }

    const { _id, ...rest } = attending

    return { id: _id.toHexString(), ...rest }
  }
}
