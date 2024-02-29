import {
  CreateUserParams,
  ICreateUserRepository,
} from '../../../controllers/user/create-user/protocols'
import { MongoClient } from '../../../database/mongo'
import { User } from '../../../models/User'

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection('user')
      .insertOne(params)

    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('user')
      .findOne({ _id: insertedId })

    if (!user) {
      throw new Error('User not created')
    }

    const { _id, ...rest } = user
    return { id: _id.toHexString(), ...rest }
  }
}
