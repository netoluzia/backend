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
exports.MongoGetClientsRepository = void 0;
const mongo_1 = require("../../../database/mongo");
class MongoGetClientsRepository {
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $match: {
                        $or: [
                            { deletedAt: { $eq: null } }, // Filtra documentos onde deletedAt é null
                            { deletedAt: { $exists: false } }, // Filtra documentos onde deletedAt não está presente
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'insurance',
                        localField: 'insurance_company',
                        foreignField: '_id',
                        as: 'insurance_data',
                    },
                },
                {
                    $unwind: {
                        path: '$insurance_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'protocol',
                        localField: 'protocol',
                        foreignField: '_id',
                        as: 'protocol_data',
                    },
                },
                {
                    $unwind: {
                        path: '$protocol_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        phone_number: 1,
                        nif: 1,
                        protocol: 1,
                        source: 1,
                        insurance_number: 1,
                        createdAt: 1,
                        insurance_company: '$insurance_data',
                        protocol_data: '$protocol_data',
                    },
                },
            ];
            const clients = yield mongo_1.MongoClient.db
                .collection('client')
                .aggregate(pipeline)
                // .find()
                .toArray();
            return clients.map((_a) => {
                var { _id } = _a, rest = __rest(_a, ["_id"]);
                return (Object.assign({ id: _id.toHexString() }, rest));
            });
        });
    }
}
exports.MongoGetClientsRepository = MongoGetClientsRepository;
