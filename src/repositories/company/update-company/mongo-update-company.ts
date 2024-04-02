import { ObjectId } from 'mongodb'
import {
  CreateCompany,
  IUpdateCompanyRepository,
} from '../../../controllers/company/create-company/protocols'
import { MongoClient } from '../../../database/mongo'
import { Company } from '../../../models/Company'

export class MongoUpdateCompany implements IUpdateCompanyRepository {
  async updateCompany(payload: CreateCompany, id: string): Promise<Company> {
    const company = await MongoClient.db
      .collection<Omit<Company, 'id'>>('company')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...payload } },
        { returnDocument: 'after' }
      )

    if (!company) throw new Error('Method not implemented.')

    const { _id, ...rest } = company
    return { id: _id.toHexString(), ...rest }
  }
}
