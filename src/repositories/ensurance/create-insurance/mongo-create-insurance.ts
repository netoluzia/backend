import {
  CreateInsuranceParams,
  ICreateInsuranceRepository,
} from '../../../controllers/ensurance/create-ensurance/protocols'
import { MongoClient } from '../../../database/mongo'
import { InsuranceCompany } from '../../../models/Insurance'

export class MongoCreateInsuranceRepository
  implements ICreateInsuranceRepository
{
  async createInsurance(
    params: CreateInsuranceParams
  ): Promise<InsuranceCompany> {
    const { insertedId } = await MongoClient.db
      .collection('insurance')
      .insertOne({ createdAt: new Date(), ...params })
    const insurance = await MongoClient.db
      .collection<Omit<InsuranceCompany, 'id'>>('insurance')
      .findOne({ _id: insertedId })

    if (!insurance) {
      throw new Error('Seguradora não foi guardada')
    }

    const { _id, ...rest } = insurance

    return { id: _id.toHexString(), ...rest }
  }
}
