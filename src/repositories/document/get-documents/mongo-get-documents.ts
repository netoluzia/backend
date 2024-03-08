import { IGetDocumentsRepository } from '../../../controllers/document/get-documents/protocols'
import { MongoClient } from '../../../database/mongo'
import { FiscalDoc } from '../../../models/Document'

export class MongoGetDocumentsRepository implements IGetDocumentsRepository {
  async getDocuments(): Promise<FiscalDoc[]> {
    const documents = await MongoClient.db
      .collection<Omit<FiscalDoc, 'id'>>('document')
      .find({})
      .toArray()

    return documents.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
