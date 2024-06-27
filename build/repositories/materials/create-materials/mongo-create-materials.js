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
exports.MongoCreateStockMaterialRepository = void 0;
const mongo_1 = require("../../../database/mongo");
const mongo_add_stock_1 = require("../add-stock/mongo-add-stock");
class MongoCreateStockMaterialRepository {
    constructor() {
        this.repository = new mongo_add_stock_1.MongoAddStockRepository();
    }
    createStockMaterial(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insertedId } = yield mongo_1.MongoClient.db
                .collection('material')
                .insertOne(Object.assign(Object.assign({ createdAt: new Date() }, params), { startQuantity: params.quantity }));
            const material = yield mongo_1.MongoClient.db
                .collection('material')
                .findOne({ _id: insertedId });
            if (!material) {
                throw new Error('Material não foi guardada');
            }
            yield this.repository.addStock({
                material: material._id.toHexString(),
                quantity: params.quantity,
                type: 'ENTRADA',
                stockInitial: params.quantity,
            });
            const { _id } = material, rest = __rest(material, ["_id"]);
            return Object.assign({ id: _id.toHexString() }, rest);
        });
    }
}
exports.MongoCreateStockMaterialRepository = MongoCreateStockMaterialRepository;
