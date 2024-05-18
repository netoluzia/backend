import { IGetProtocolsRepository } from '../../../controllers/protocols/get-protocols/protocol'
import { MongoClient } from '../../../database/mongo'
import { Protocol } from '../../../models/Protocol'

export class MongoGetProtocolsRepository implements IGetProtocolsRepository {
  async getProtocols(): Promise<Protocol[]> {
    const protocols = await MongoClient.db
      .collection<Omit<Protocol, 'id'>>('protocol')
      .find({})
      .toArray()

    return protocols.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))
  }
}
