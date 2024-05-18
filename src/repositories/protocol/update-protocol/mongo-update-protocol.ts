import { ObjectId } from 'mongodb'
import {
  IUpdateProtocol,
  IUpdateProtocolRepository,
} from '../../../controllers/protocols/update-protocol/protocols'
import { MongoClient } from '../../../database/mongo'
import { Protocol } from '../../../models/Protocol'

export class MongoUpdateProtocolRepository
  implements IUpdateProtocolRepository
{
  async updateProtocol(
    id: string,
    payload: IUpdateProtocol
  ): Promise<Protocol> {
    const protocol = await MongoClient.db
      .collection<Omit<Protocol, 'id'>>('protocol')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
          },
        },
        {
          returnDocument: 'after',
        }
      )

    if (!protocol) throw new Error('Method not implemented.')
    const { _id, ...rest } = protocol
    return { id: _id.toHexString(), ...rest }
  }
}
