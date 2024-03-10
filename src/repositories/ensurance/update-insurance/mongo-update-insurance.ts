import { ObjectId } from 'mongodb'
import { CreateInsuranceParams } from '../../../controllers/ensurance/create-ensurance/protocols'
import { IUpdateInsuranceRepository } from '../../../controllers/ensurance/update-ensurance/protocols'
import { MongoClient } from '../../../database/mongo'
import { InsuranceCompany } from '../../../models/Insurance'

export class MongoUpdateInsuranceRepository
  implements IUpdateInsuranceRepository
{
  async updateService(
    id: string,
    payload: CreateInsuranceParams
  ): Promise<InsuranceCompany> {
    const updatedInsurance = await MongoClient.db
      .collection<Omit<InsuranceCompany, 'id'>>('insurance')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
          },
        },
        {
          returnDocument: 'after',
        }
      )
    if (!updatedInsurance) throw new Error('i=Insurance was not updated')
    const { _id, ...rest } = updatedInsurance

    return { id: _id.toHexString(), ...rest }
  }
}
