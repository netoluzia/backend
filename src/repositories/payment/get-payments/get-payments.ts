import { IGetPaymentsRepository } from '../../../controllers/payment/get-payments/protocols'
import { MongoClient } from '../../../database/mongo'
import { Payment } from '../../../models/Payment'

export class MongoGetPaymentsRepository implements IGetPaymentsRepository {
  async getPayments(): Promise<Payment[]> {
    const payments = await MongoClient.db
      .collection<Omit<Payment, 'id'>>('payment')
      .find({})
      .toArray()
    return payments.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
