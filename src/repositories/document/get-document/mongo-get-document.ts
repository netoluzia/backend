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
            createdAt: 1,
            client: '$client',
          },
        },
      ])
      .toArray()
    // .findOne({ _id: new ObjectId(id) })

    if (!document) throw new Error('FiscalDoc not found')

    const { _id, ...rest } = document[0]
    return { id: _id.toHexString(), ...rest }
  }
}
