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
exports.MongoGetLogsRepository = void 0;
const mongo_1 = require("../../../database/mongo");
class MongoGetLogsRepository {
    getLogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mongo_1.MongoClient.db
                .collection('stock-logs')
                .aggregate([
                {
                    $project: {
                        idMaterial: 1,
                        quantity: 1,
                        type: 1,
                        stockInitial: 1,
                        stockFinal: 1,
                        day: { $dayOfMonth: '$createdAt' },
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                    },
                },
                {
                    $match: {
                        month: params.month,
                        year: params.year,
                    },
                },
                {
                    $group: {
                        _id: '$idMaterial',
                        operations: {
                            $push: {
                                id: '$_id',
                                type: '$type',
                                quantity: '$quantity',
                                day: '$day',
                                stockInitial: '$stockInitial',
                                stockFinal: '$stockFinal',
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'material',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'materialDetails',
                    },
                },
                {
                    $unwind: '$materialDetails',
                },
                {
                    $project: {
                        idMaterial: '$_id',
                        operations: 1,
                        materialName: '$materialDetails.name',
                        materialPrice: '$materialDetails.price',
                        materialCategory: '$materialDetails.category',
                        materialStockMin: '$materialDetails.min_quantity',
                    },
                },
            ])
                .toArray();
            return data;
        });
    }
    getInitialStock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            return 4;
        });
    }
}
exports.MongoGetLogsRepository = MongoGetLogsRepository;
