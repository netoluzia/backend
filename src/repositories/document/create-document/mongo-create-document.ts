import {
  ICreateDocumentRepository,
  ParamsCreateDocument,
} from '../../../controllers/document/create-document/protocols'
import { MongoClient } from '../../../database/mongo'
import { FiscalDoc } from '../../../models/Document'

export class MongoCreateDocumentRepository
  implements ICreateDocumentRepository
{
  async createDocument(params: ParamsCreateDocument): Promise<FiscalDoc> {
    const { insertedId } = await MongoClient.db
      .collection('document')
      .insertOne({ ...params, createdAt: new Date() })
    const document = await MongoClient.db
      .collection<Omit<FiscalDoc, 'id'>>('document')
      .findOne({ _id: insertedId })

    if (!document) throw new Error('FiscalDoc was not created')
    const { _id, ...rest } = document
    return { id: _id.toHexString(), ...rest }
  }
}
