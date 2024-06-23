"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAddStockRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoAddStockRepository {
    addStock(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { stockFinal, stockInitial } = params, spread = __rest(params, ["stockFinal", "stockInitial"]);
            const stock = yield mongo_1.MongoClient.db
                .collection('material')
                .findOne({ _id: new mongodb_1.ObjectId(params.material) });
            if (!stock)
                throw new Error('Material not found');
            if (!params.stockInitial) {
                const updated = yield mongo_1.MongoClient.db
                    .collection('material')
                    .findOneAndUpdate({ _id: new mongodb_1.ObjectId(params.material) }, {
                    $set: {
                        quantity: params.type == 'ENTRADA'
                            ? stock.quantity + params.quantity
                            : stock.quantity - params.quantity,
                    },
                }, { returnDocument: 'after' });
                if (!updated)
                    throw new Error('Material not found');
            }
            yield this.addLogs(Object.assign({ stockFinal: params.type == 'ENTRADA'
                    ? params.stockInitial || stock.quantity + params.quantity
                    : stock.quantity - params.quantity, stockInitial: (yield this.isAnotherMonth(params.material))
                    ? (_a = (yield this.isAnotherMonth(params.material))) === null || _a === void 0 ? void 0 : _a.stockFinal
                    : stock.startQuantity }, spread));
            const { _id } = stock, rest = __rest(stock, ["_id"]);
            return Object.assign({ id: _id.toHexString() }, rest);
        });
    }
    addLogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_1.MongoClient.db.collection('stock-logs').insertOne({
                createdAt: new Date(),
                idMaterial: new mongodb_1.ObjectId(params.material),
                quantity: params.quantity,
                type: params.type,
                stockInitial: params.stockInitial,
                stockFinal: params.stockFinal,
            });
        });
    }
    isAnotherMonth(material) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastStockItem = yield mongo_1.MongoClient.db
                .collection('stock-logs')
                .findOne({ idMaterial: new mongodb_1.ObjectId(material) }, { sort: { _id: -1 } } // Ordena pelo _id em ordem decrescente para obter o último registro
            );
            if (!lastStockItem)
                return null;
            const { _id } = lastStockItem, rest = __rest(lastStockItem, ["_id"]);
            if (lastStockItem.createdAt.getFullYear() != new Date().getFullYear()) {
                return Object.assign({ id: _id.toHexString() }, rest);
            }
            else {
                if (lastStockItem.createdAt.getMonth() != new Date().getMonth()) {
                    return Object.assign({ id: _id.toHexString() }, rest);
                }
            }
            return null;
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
        });
    }
}
exports.MongoAddStockRepository = MongoAddStockRepository;
