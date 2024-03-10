import { ObjectId } from 'mongodb'
import { IDeleteInsuranceRepository } from '../../../controllers/ensurance/delete-ensurance/protocols'
import { MongoClient } from '../../../database/mongo'
import { InsuranceCompany } from '../../../models/Insurance'
import { Service } from '../../../models/Service'

export class MongoDeleteInsuranceRepository
  implements IDeleteInsuranceRepository
{
  async deleteInsurance(id: string): Promise<InsuranceCompany> {
    const insurance = await MongoClient.db
      .collection<Omit<InsuranceCompany, 'id'>>('insurance')
      .findOne({ _id: new ObjectId(id) })

    if (!insurance) throw new Error('Method not implemented.')
    const { deletedCount } = await MongoClient.db
      .collection('insurance')
      .deleteOne({ _id: new ObjectId(id) })
    if (!deletedCount) throw new Error('Insurance was not found')
    const { _id, ...rest } = insurance

    return { id: _id.toHexString(), ...rest }
  }
}
