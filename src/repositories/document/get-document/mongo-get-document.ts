import { ObjectId } from 'mongodb'
import { IGetDocumentRepository } from '../../../controllers/document/get-document/protocols'
import { MongoClient } from '../../../database/mongo'
import { FiscalDoc } from '../../../models/Document'

export class MongoGetDocumentRepository implements IGetDocumentRepository {
  async getDocument(id: string): Promise<FiscalDoc | any> {
    const document = await MongoClient.db
      .collection<Omit<FiscalDoc, 'id'>>('document')
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'client',
            localField: 'client',
            foreignField: '_id',
            as: 'client',
          },
        },
        {
          $unwind: {
            path: '$client',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 1,
            items: 1,
            document: 1,
            payment: 1,
            emission_date: 1,
            reference: 1,
            serie: 1,
            total: 1,
            attendant: 1,
            createdAt: 1,
            change: 1,
            hash4: 1,
            hash64: 1,
            amount_received: 1,
            client: '$client',
            expiryDate: 1,
          },
        },
        {
          $lookup: {
            from: 'insurance',
            localField: 'client.insurance_company',
            foreignField: '_id',
            as: 'client.insurance_company',
          },
        },
        // {
        //   $wind: {
        //     path: '$client.insurance_company',
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $project: {
            _id: 1,
            items: 1,
            document: 1,
            payment: 1,
            emission_date: 1,
            reference: 1,
            serie: 1,
            total: 1,
            createdAt: 1,
            hash4: 1,
            hash64: 1,
            attendant: 1,
            client: '$client',
            change: 1,
            amount_received: 1,
            expiryDate: 1,
          },
        },
      ])
      .toArray()
    // .findOne({ _id: new ObjectId(id) })

    if (!document) throw new Error('FiscalDoc not found')

    const { _id, total, ...rest } = document[0]
    return { id: _id.toHexString(), tax: total * (1 / 100), total, ...rest }
  }
}
