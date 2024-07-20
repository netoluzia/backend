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
exports.MongoGetMaterialFormServiceRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetMaterialFormServiceRepository {
    getMaterialFromService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const material = yield mongo_1.MongoClient.db
                .collection('service')
                .aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(id),
                    },
                },
                {
                    $unwind: '$material',
                },
                {
                    $lookup: {
                        from: 'material',
                        localField: 'material.material',
                        foreignField: '_id',
                        as: 'materialDetails',
                    },
                },
                {
                    $unwind: '$materialDetails',
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        net_price: { $first: '$net_price' },
                        category: { $first: '$category' },
                        type: { $first: '$type' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        materials: {
                            $push: {
                                materialId: '$material.material',
                                quantity: '$material.qtd',
                                materialDetails: '$materialDetails',
                            },
                        },
                    },
                },
            ])
                .toArray();
            return material[0];
        });
    }
}
exports.MongoGetMaterialFormServiceRepository = MongoGetMaterialFormServiceRepository;
