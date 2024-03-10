import { ObjectId } from 'mongodb'
import { CreatePayment } from '../../../controllers/payment/create-payment/protocols'
import { IUpdatePaymentRepository } from '../../../controllers/payment/update-payment/protocols'
import { MongoClient } from '../../../database/mongo'
import { Payment } from '../../../models/Payment'

export class MongoUpdatePaymentRepository implements IUpdatePaymentRepository {
  async updatePayment(id: string, payload: CreatePayment): Promise<Payment> {
    const payment = await MongoClient.db
      .collection<Omit<Payment, 'id'>>('payment')
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

    if (!payment) throw new Error('Method not implemented.')
    const { _id, ...rest } = payment
    return { id: _id.toHexString(), ...rest }
  }
}
