import { IGetDocumentsRepository } from '../../../controllers/document/get-documents/protocols'
import { MongoClient } from '../../../database/mongo'
import { FiscalDoc } from '../../../models/Document'

export class MongoGetDocumentsRepository implements IGetDocumentsRepository {
  async getDocuments(): Promise<FiscalDoc[]> {
    const documents = await MongoClient.db
      .collection<Omit<FiscalDoc, 'id'>>('document')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return documents.map(({ _id, total, ...rest }) => ({
      id: _id.toHexString(),
      total,
      tax: total * (1 / 100),
      ...rest,
    }))
  }
}
