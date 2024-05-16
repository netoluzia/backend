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
exports.MongoGetReportFinancialRepository = void 0;
const mongo_1 = require("../../database/mongo");
class MongoGetReportFinancialRepository {
    getReportFinancial(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(params.range.$gte),
                        },
                        document: params.document,
                    },
                },
                {
                    $lookup: {
                        from: 'client', // Nome da coleção de clientes
                        localField: 'client', // Campo local que faz referência ao _id do cliente
                        foreignField: '_id', // Campo na coleção de clientes que corresponde ao campo local
                        as: 'clientData', // Nome do novo campo que conterá os dados do cliente
                    },
                },
                {
                    $unwind: '$clientData', // Desnormaliza o array criado pelo $lookup para ter um documento por cliente
                },
                {
                    $lookup: {
                        from: 'user', // Nome da coleção de attendants
                        localField: 'attendant', // Campo local que faz referência ao _id do attendant
                        foreignField: '_id', // Campo na coleção de attendants que corresponde ao campo local
                        as: 'attendantData', // Nome do novo campo que conterá os dados do attendant
                    },
                },
                {
                    $unwind: '$attendantData', // Desnormaliza o array criado pelo $lookup para ter um documento por attendant
                },
            ];
            const documents = yield mongo_1.MongoClient.db
                .collection('document')
                .aggregate(pipeline)
                .toArray();
            const response = {
                toPay: 0,
                paid: 0,
                documents: documents.map((_a) => {
                    var { total, document } = _a, rest = __rest(_a, ["total", "document"]);
                    return (Object.assign({ tax: document == 'FR' || document == 'RG' ? total * (1 / 100) : 0, document,
                        total }, rest));
                }),
            };
            documents.forEach((item) => {
                if (item.paid) {
                    response.paid += item.total;
                }
                else {
                    response.toPay += item.total;
                }
            });
            return response;
        });
    }
}
exports.MongoGetReportFinancialRepository = MongoGetReportFinancialRepository;
