import { ICountDocumentRepository } from '../../../controllers/document/create-document/protocols'
import { MongoClient } from '../../../database/mongo'

export class MongoCountDocuments implements ICountDocumentRepository {
  async count(document: string): Promise<number> {
    const doc = await MongoClient.db
      .collection('document')
      .aggregate([
        {
          $match: {
            document: document,
          },
        },
        {
          $count: 'total',
        },
      ])
      .toArray()
    return doc[0]?.total || 0
  }
}
