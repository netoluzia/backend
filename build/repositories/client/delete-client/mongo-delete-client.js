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
exports.MongoDeleteClientRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoDeleteClientRepository {
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield mongo_1.MongoClient.db
                .collection('client')
                .findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!client)
                throw new Error('Client was not found');
            const { deletedCount } = yield mongo_1.MongoClient.db
                .collection('service')
                .deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (!deletedCount)
                throw new Error('Client was not deleted');
            const { _id } = client, rest = __rest(client, ["_id"]);
            return Object.assign({ id: _id.toHexString() }, rest);
        });
    }
}
exports.MongoDeleteClientRepository = MongoDeleteClientRepository;
