import { ObjectId } from 'mongodb'
import { IGetProtocolRepository } from '../../../controllers/protocols/get-protocol/protocol'
import { MongoClient } from '../../../database/mongo'
import { Protocol } from '../../../models/Protocol'

export class MongoGetProtocolRepository implements IGetProtocolRepository {
  async getProtocol(id: string): Promise<Protocol> {
    const protocol = await MongoClient.db
      .collection<Omit<Protocol, 'id'>>('protocol')
      .findOne({ _id: new ObjectId(id) })
    if (!protocol) throw new Error('Protocolo nao encontrado')
    const { _id, ...rest } = protocol
    return { id: _id.toHexString(), ...rest }
  }
}
