import { IGetInsurancesRepository } from '../../../controllers/ensurance/get-ensurances/protocols'
import { MongoClient } from '../../../database/mongo'
import { InsuranceCompany } from '../../../models/Insurance'

export class MongoGetInsurancesRepository implements IGetInsurancesRepository {
  async getInsurances(): Promise<InsuranceCompany[]> {
    const insurances = await MongoClient.db
      .collection<Omit<InsuranceCompany, 'id'>>('insurance')
      .find({})
      .toArray()
    return insurances.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
