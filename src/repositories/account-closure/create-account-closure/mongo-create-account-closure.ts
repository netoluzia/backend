import {
  ICreateAccount,
  ICreateAccountClosureRepository,
} from '../../../controllers/account-closure/create-account-closure/protocol'
import { MongoClient } from '../../../database/mongo'
import { AccountClosure } from '../../../models/AccountClosure'

export class MongoCreateAccountClosure
  implements ICreateAccountClosureRepository
{
  async createAccountClosure(params: ICreateAccount): Promise<AccountClosure> {
    let query: any = {}
    if (params.type == 'daily') {
      query = {
        day: params.day,
      }
    } else if (params.type == 'monthly') {
      query = {
        month: params.month,
      }
    }
    const accountExists = await MongoClient.db
      .collection<Omit<AccountClosure, 'id'>>('account')
      .findOne(query)

    if (accountExists) {
      throw new Error('Conta já fechada')
    }
    const { insertedId } = await MongoClient.db
      .collection<Omit<AccountClosure, 'id'>>('account')
      .insertOne(params)
    const account = await MongoClient.db
      .collection<Omit<AccountClosure, 'id'>>('account')
      .findOne({ _id: insertedId })

    if (!account) throw new Error('Something went wrong')
    const { _id, ...rest } = account
    return { id: _id.toHexString(), ...rest }
  }
}
