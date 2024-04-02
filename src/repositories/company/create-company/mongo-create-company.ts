import {
  CreateCompany,
  ICreateCompanyRepository,
} from '../../../controllers/company/create-company/protocols'
import { MongoClient } from '../../../database/mongo'
import { Company } from '../../../models/Company'

export class MongoCreateCompany implements ICreateCompanyRepository {
  async createCompany(payload: CreateCompany): Promise<Company> {
    const { insertedId } = await MongoClient.db
      .collection('company')
      .insertOne(payload)

    if (!insertedId) throw new Error('Method not implemented.')

    const company = await MongoClient.db
      .collection<Omit<Company, 'id'>>('company')
      .findOne({ _id: insertedId })

    if (!company) throw new Error('Method not implemented.')
    const { _id, ...rest } = company

    return { id: _id.toHexString(), ...rest }
  }
}
