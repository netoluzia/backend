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
exports.MongoCreateClientRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoCreateClientRepository {
    createClient(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insurance_company } = params, restData = __rest(params, ["insurance_company"]);
            const { insertedId } = yield mongo_1.MongoClient.db.collection('client').insertOne(Object.assign({ insurance_company: insurance_company
                    ? new mongodb_1.ObjectId(insurance_company)
                    : null, protocol: params.protocol ? new mongodb_1.ObjectId(params.protocol) : null }, restData));
            const client = yield mongo_1.MongoClient.db
                .collection('client')
                .findOne({ _id: insertedId });
            if (!client) {
                throw new Error('Service was not created');
            }
            const { _id } = client, rest = __rest(client, ["_id"]);
            return Object.assign({ id: _id.toHexString() }, rest);
        });
    }
}
exports.MongoCreateClientRepository = MongoCreateClientRepository;
