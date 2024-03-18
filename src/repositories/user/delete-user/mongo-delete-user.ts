import { ObjectId } from 'mongodb'
import { IDeleteUserRepository } from '../../../controllers/user/delete-user/protocols'
import { MongoClient } from '../../../database/mongo'
import { User } from '../../../models/User'

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('user')
      .findOneAndDelete({ _id: new ObjectId(id) })

    if (!user) throw new Error('Ocorreu um erro')
    const { _id, ...rest } = user
    return { id: _id.toHexString(), ...rest }
  }
}
