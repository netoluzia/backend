import { IGetUsersRepository } from '../../../controllers/user/get-users/protocols'
import { MongoClient } from '../../../database/mongo'
import { User } from '../../../models/User'

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, 'id'>>('user')
      .find({})
      .toArray()
    return users.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }))
  }
}
