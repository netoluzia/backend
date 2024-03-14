import {
  CreateUserParams,
  ICreateUserRepository,
} from '../../../controllers/user/create-user/protocols'
import { MongoClient } from '../../../database/mongo'
import { User } from '../../../models/User'

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    try {
      const collection = MongoClient.db.collection('user')
      await collection.createIndex({ email: 1 }, { unique: true })
      const { insertedId } = await collection.insertOne(params)
      const user = await MongoClient.db
        .collection<Omit<User, 'id'>>('user')
        .findOne({ _id: insertedId })

      if (!user) {
        throw new Error('User not created')
      }

      const { _id, ...rest } = user
      return { id: _id.toHexString(), ...rest }
    } catch (error) {
      return {
        id: 'string',
        email: 'hhhdf',
        name: 'edbebjd',
        password: 'ewjen',
        role: 'kenrjb',
        username: 'eherj',
      }
    }
  }
}
