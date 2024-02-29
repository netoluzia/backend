import {
  CreatePayment,
  ICreatePaymentRepository,
} from '../../../controllers/payment/create-payment/protocols'
import { MongoClient } from '../../../database/mongo'
import { Payment } from '../../../models/Payment'

export class MongoCreatePaymentRepository implements ICreatePaymentRepository {
  async createPayment(params: CreatePayment): Promise<Payment> {
    const { insertedId } = await MongoClient.db
      .collection('payment')
      .insertOne({ ...params, createdAt: new Date() })
    const payment = await MongoClient.db
      .collection<Omit<Payment, 'id'>>('payment')
      .findOne({ _id: insertedId })

    if (!payment) {
      throw new Error('Payment was not creadted')
    }
    const { _id, ...rest } = payment
    return { id: _id.toHexString(), ...rest }
  }
}
