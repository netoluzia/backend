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
exports.MongoGetDocumentRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetDocumentRepository {
    getDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield mongo_1.MongoClient.db
                .collection('document')
                .aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: 'client',
                        localField: 'client',
                        foreignField: '_id',
                        as: 'client',
                    },
                },
                {
                    $unwind: {
                        path: '$client',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        items: 1,
                        document: 1,
                        payment: 1,
                        emission_date: 1,
                        reference: 1,
                        serie: 1,
                        total: 1,
                        attendant: 1,
                        createdAt: 1,
                        change: 1,
                        amount_received: 1,
                        client: '$client',
                    },
                },
                {
                    $lookup: {
                        from: 'insurance',
                        localField: 'client.insurance_company',
                        foreignField: '_id',
                        as: 'client.insurance_company',
                    },
                },
                // {
                //   $wind: {
                //     path: '$client.insurance_company',
                //     preserveNullAndEmptyArrays: true,
                //   },
                // },
                {
                    $project: {
                        _id: 1,
                        items: 1,
                        document: 1,
                        payment: 1,
                        emission_date: 1,
                        reference: 1,
                        serie: 1,
                        total: 1,
                        createdAt: 1,
                        attendant: 1,
                        client: '$client',
                        change: 1,
                        amount_received: 1,
                    },
                },
            ])
                .toArray();
            // .findOne({ _id: new ObjectId(id) })
            if (!document)
                throw new Error('FiscalDoc not found');
            const _a = document[0], { _id, total } = _a, rest = __rest(_a, ["_id", "total"]);
            return Object.assign({ id: _id.toHexString(), tax: total * (1 / 100), total }, rest);
        });
    }
}
exports.MongoGetDocumentRepository = MongoGetDocumentRepository;
