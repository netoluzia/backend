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
exports.MongoGetReportPerMonth = void 0;
const mongo_1 = require("../../../database/mongo");
class MongoGetReportPerMonth {
    reportPerMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $match: {
                        paid: true, // Filtra apenas os documentos pagos
                    },
                },
                {
                    $project: {
                        month: { $month: '$emission_date' }, // Extrai o mês da data de emissão
                        total: '$total', // Seleciona o campo total para os documentos
                    },
                },
                {
                    $group: {
                        _id: '$month', // Agrupa pelos meses
                        total: { $sum: '$total' }, // Soma os totais para cada mês
                    },
                },
                {
                    $addFields: {
                        month: '$_id', // Renomeia o campo _id para month
                    },
                },
                {
                    $sort: {
                        month: 1, // Ordena pelo mês
                    },
                },
            ];
            const result = yield mongo_1.MongoClient.db
                .collection('document')
                .aggregate(pipeline)
                .toArray();
            const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
            const finalResult = allMonths.map((month) => {
                const existingMonth = result.find((item) => item.month === month);
                return existingMonth || { month, total: null };
            });
            return finalResult;
        });
    }
}
exports.MongoGetReportPerMonth = MongoGetReportPerMonth;
