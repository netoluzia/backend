import {
  ICreateDocumentRepository,
  ParamsCreateDocument,
} from '../../../controllers/document/create-document/protocols'
import { MongoClient } from '../../../database/mongo'
import { Document } from '../../../models/Document'

export class MongoCreateDocumentRepository
  implements ICreateDocumentRepository
{
  async createDocument(params: ParamsCreateDocument): Promise<Document> {
    const { insertedId } = await MongoClient.db
      .collection('document')
      .insertOne({ ...params, createdAt: new Date() })
    const document = await MongoClient.db
      .collection<Omit<Document, 'id'>>('document')
      .findOne({ _id: insertedId })

    if (!document) throw new Error('Document was not created')
    const { _id, ...rest } = document
    return { id: _id.toHexString(), ...rest }
  }
}
