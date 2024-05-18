import {
  ICreateProtocol,
  ICreateProtocolRepository,
} from '../../../controllers/protocols/create-protocol/protocols'
import { MongoClient } from '../../../database/mongo'
import { Protocol } from '../../../models/Protocol'

export class MongoCreateProtocol implements ICreateProtocolRepository {
  async createProtocol(payload: ICreateProtocol): Promise<Protocol> {
    const protocol = await MongoClient.db
      .collection('protocol')
      .insertOne(payload)
    const { insertedId } = protocol
    const protocolSaved = await MongoClient.db
      .collection<Omit<Protocol, 'id'>>('protocol')
      .findOne({ _id: insertedId })

    if (!protocolSaved) throw new Error('Protocolo nao foi salvo')

    const { _id, ...rest } = protocolSaved

    return { id: _id.toHexString(), ...rest }
  }
}
