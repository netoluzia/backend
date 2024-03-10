import { ObjectId } from 'mongodb'
import { MongoClient } from '../../../database/mongo'
import { Payment } from '../../../models/Payment'
import { IDeletePaymentRepository } from '../../../controllers/payment/delete-payment/protocols'

export class MongoDeletePayment implements IDeletePaymentRepository {
  async deletePayment(id: string): Promise<Payment> {
    const payment = await MongoClient.db
      .collection<Omit<Payment, 'id'>>('payment')
      .findOne({ _id: new ObjectId(id) })
    if (!payment) throw new Error('An error ocuurede')

    const { deletedCount } = await MongoClient.db
      .collection('payment')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) throw new Error('Method was not deleted')
    const { _id, ...rest } = payment
    return { id: _id.toHexString(), ...rest }
  }
}
