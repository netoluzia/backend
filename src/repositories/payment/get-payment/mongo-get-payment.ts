import { ObjectId } from 'mongodb'
import { IGetPaymentRepository } from '../../../controllers/payment/get-payment/protocols'
import { MongoClient } from '../../../database/mongo'
import { Payment } from '../../../models/Payment'

export class MongoGetPayment implements IGetPaymentRepository {
  async getPayment(id: string): Promise<Payment> {
    const payment = await MongoClient.db
      .collection<Omit<Payment, 'id'>>('payment')
      .findOne({ _id: new ObjectId(id) })
    if (!payment) throw new Error('An error ocuurede')

    const { _id, ...rest } = payment
    return { id: _id.toHexString(), ...rest }
  }
}
