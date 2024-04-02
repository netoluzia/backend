import { IGetCompanyRepository } from '../../../controllers/company/get-company/protocols'
import { MongoClient } from '../../../database/mongo'
import { Company } from '../../../models/Company'

export class MongoGetCompany implements IGetCompanyRepository {
  async getCompany(): Promise<Company> {
    const company = await MongoClient.db
      .collection<Omit<Company, 'id'>>('company')
      .find({})
      .toArray()

    if (!company) throw new Error('Houve um erro')

    const { _id, ...rest } = company[0]

    return { id: _id.toHexString(), ...rest }
  }
}
