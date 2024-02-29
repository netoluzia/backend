import { IGetDocumentsRepository } from '../../../controllers/document/get-documents/protocols'
import { MongoClient } from '../../../database/mongo'
import { Document } from '../../../models/Document'

export class MongoGetDocumentsRepository implements IGetDocumentsRepository {
  async getDocuments(): Promise<Document[]> {
    const documents = await MongoClient.db
      .collection<Omit<Document, 'id'>>('document')
      .find({})
      .toArray()

    return documents.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
