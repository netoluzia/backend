import { ObjectId } from 'mongodb'
import { IGetInsuranceRepository } from '../../../controllers/ensurance/get-ensurance/protocols'
import { MongoClient } from '../../../database/mongo'
import { InsuranceCompany } from '../../../models/Insurance'

export class MongoGetInsuranceRepository implements IGetInsuranceRepository {
  async getInsurance(id: string): Promise<InsuranceCompany> {
    const insurance = await MongoClient.db
      .collection<Omit<InsuranceCompany, 'id'>>('insurance')
      .findOne({ _id: new ObjectId(id) })

    if (!insurance) throw new Error('Insurance not found')

    const { _id, ...rest } = insurance
    return { id: _id.toHexString(), ...rest }
  }
}
