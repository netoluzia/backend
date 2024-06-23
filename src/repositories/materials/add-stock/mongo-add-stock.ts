import { ObjectId } from 'mongodb'
import {
  IAddStockParams,
  IAddStockRepository,
} from '../../../controllers/materials/add-stock/protocols'
import { MongoClient } from '../../../database/mongo'
import { Stock } from '../../../models/Stock'
import { Logs } from '../../../models/Logs'

export class MongoAddStockRepository implements IAddStockRepository {
  async addStock(params: IAddStockParams): Promise<Stock> {
    const { stockFinal, stockInitial, ...spread } = params
    const stock = await MongoClient.db
      .collection<Omit<Stock, 'id'>>('material')
      .findOne({ _id: new ObjectId(params.material) })
    if (!stock) throw new Error('Material not found')

    if (!params.stockInitial) {
      const updated = await MongoClient.db
        .collection<Omit<Stock, 'id'>>('material')
        .findOneAndUpdate(
          { _id: new ObjectId(params.material) },
          {
            $set: {
              quantity:
                params.type == 'ENTRADA'
                  ? stock.quantity + params.quantity
                  : stock.quantity - params.quantity,
            },
          },
          { returnDocument: 'after' }
        )
      if (!updated) throw new Error('Material not found')
    }

    await this.addLogs({
      stockFinal:
        params.type == 'ENTRADA'
          ? params.stockInitial || stock.quantity + params.quantity
          : stock.quantity - params.quantity,
      stockInitial: (await this.isAnotherMonth(params.material))
        ? (
            await this.isAnotherMonth(params.material)
          )?.stockFinal
        : stock.startQuantity,
      ...spread,
    })

    const { _id, ...rest } = stock
    return { id: _id.toHexString(), ...rest }
  }
  async addLogs(params: IAddStockParams): Promise<void> {
    await MongoClient.db.collection<Omit<Logs, 'id'>>('stock-logs').insertOne({
      createdAt: new Date(),
      idMaterial: new ObjectId(params.material),
      quantity: params.quantity,
      type: params.type,
      stockInitial: params.stockInitial,
      stockFinal: params.stockFinal,
    })
  }

  async isAnotherMonth(material: string): Promise<Logs | null> {
    const lastStockItem = await MongoClient.db
      .collection<Omit<Logs, 'id'>>('stock-logs')
      .findOne(
        { idMaterial: new ObjectId(material) },
        { sort: { _id: -1 } } // Ordena pelo _id em ordem decrescente para obter o último registro
      )

    if (!lastStockItem) return null
    const { _id, ...rest } = lastStockItem
    if (lastStockItem.createdAt.getFullYear() != new Date().getFullYear()) {
      return { id: _id.toHexString(), ...rest }
    } else {
      if (lastStockItem.createdAt.getMonth() != new Date().getMonth()) {
        return { id: _id.toHexString(), ...rest }
      }
    }
    return null
    // if (lastStockItem)
    //     const logs = await MongoClient.db
    //       .collection<Omit<Logs, 'id'>>('stock-logs')
    //       .findOneAndUpdate(
    //         { idMaterial: new ObjectId(material) },
    //         { sort: { _id: -1 } } // Ordena pelo _id em ordem decrescente para obter o último registro
    //       )
    //     if (logs) {
    //       const { _id, ...rest } = logs
    //       return { id: _id.toHexString(), ...rest }
    //     }
    //   } else if (lastStockItem.createdAt.getMonth() != new Date().getMonth()) {
    //     return true
    //   }
    // return null
  }
}
