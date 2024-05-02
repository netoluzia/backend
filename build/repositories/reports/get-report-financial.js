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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGetReportFinancialRepository = void 0;
const mongo_1 = require("../../database/mongo");
class MongoGetReportFinancialRepository {
    getReportFinancial(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $match: {
                        emission_date: {
                            $gte: new Date(params.range.$gte),
                        },
                        paid: params.paid,
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
                documents,
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
