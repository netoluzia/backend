import { ObjectId } from 'mongodb'
import {
  IGetUserRepository,
  PayloadParams,
} from '../../../controllers/user/get-user/protocols'
import { User } from '../../../models/User'
import { MongoClient } from '../../../database/mongo'

export class MongoGetUserRepository implements IGetUserRepository {
  async getUser(payload: PayloadParams): Promise<User | null> {
    const query = payload.id
      ? { _id: new ObjectId(payload.id) }
      : payload.username
      ? { username: payload.username }
      : { email: payload.email }
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('user')
      .findOne(query)

    if (!user) return null
    const { _id, ...rest } = user
    return { id: _id.toHexString(), ...rest }
  }
}
