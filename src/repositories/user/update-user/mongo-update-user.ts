import { ObjectId } from 'mongodb'
import {
  IUpdateUserRepository,
  UpdateParams,
} from '../../../controllers/user/update-user/protocols'
import { MongoClient } from '../../../database/mongo'
import { User } from '../../../models/User'

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async update(id: string, payload: UpdateParams): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('user')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...payload } },
        { returnDocument: 'after' }
      )
    if (!user) throw new Error('Ocorreu um erro')
    const { _id, ...rest } = user
    return { id: _id.toHexString(), ...rest }
  }
}
