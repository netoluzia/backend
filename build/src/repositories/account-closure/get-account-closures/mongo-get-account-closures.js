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
exports.MongoGetAccountClosuresRepository = void 0;
const mongo_1 = require("../../../database/mongo");
class MongoGetAccountClosuresRepository {
    getAccountClosures(range) {
        return __awaiter(this, void 0, void 0, function* () {
            // const docs = await MongoClient.db.collection('document').find({}).toArray()
            // docs.forEach(async (doc) => {
            //   MongoClient.db
            //     .collection('document')
            //     .updateOne(
            //       { _id: doc._id },
            //       {
            //         $set: {
            //           emission_date: new Date(doc.emission_date),
            //           items: doc.item.map(({ id, ...rest }: any) => ({
            //             id: new ObjectId(String(id)),
            //             ...rest,
            //           })),
            //         },
            //       }
            //     )
            // })
            const items = yield mongo_1.MongoClient.db
                .collection('document')
                .aggregate([
                {
                    $match: {
                        $and: range.$and,
                    },
                },
                {
                    $lookup: {
                        from: 'service', // Nome da primeira coleção referenciada
                        localField: 'items.id',
                        foreignField: '_id',
                        as: 'service_data',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    category: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'product', // Nome da segunda coleção referenciada
                        localField: 'items.id',
                        foreignField: '_id',
                        as: 'product_data',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    category: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $match: {
                        paid: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        document: 1,
                        // emission_date: 1,
                        // client: 1,
                        // amount_received: 1,
                        // attendant: 1,
                        // total: 1,
                        // reference: 1,
                        // serie: 1,
                        // createdAt: 1,
                        // change: 1,
                        // hash4: 1,
                        // hash64: 1,
                        paid: 1,
                        items: 1,
                        referenced_documents: {
                            $concatArrays: ['$service_data', '$product_data'],
                        },
                    },
                },
            ])
                .toArray();
            return this.groupItemsByCategory(items);
        });
    }
    groupData(data) {
        const mergedData = {};
        data.forEach((entry) => {
            entry.items.forEach((item) => {
                if (!mergedData[item.id]) {
                    mergedData[item.id] = [];
                }
                mergedData[item.id].push(item);
            });
            entry.referenced_documents.forEach((document) => {
                if (!mergedData[document._id]) {
                    mergedData[document._id] = [];
                }
                mergedData[document._id].push(document);
            });
        });
        return Object.keys(mergedData).map((id) => ({
            id,
            mergedData: mergedData[id],
        }));
    }
    generateSalesReport(data) {
        const salesByCategory = {};
        data.forEach((entry) => {
            entry.mergedData.forEach((item) => {
                const category = item.category || 'default';
                if (!salesByCategory[category]) {
                    salesByCategory[category] = 0;
                }
                salesByCategory[category] += item.total;
            });
        });
        return Object.keys(salesByCategory).map((category) => ({
            category,
            totalSales: salesByCategory[category],
        }));
    }
    groupItemsByCategory(data) {
        const totalByCategory = {};
        data.forEach((record) => {
            record.referenced_documents.forEach((refDoc) => {
                const matchingItem = record.items.find((item) => {
                    return String(item.id) == String(refDoc._id);
                });
                if (matchingItem) {
                    const category = refDoc.category;
                    const total = matchingItem.total;
                    if (!totalByCategory[category]) {
                        totalByCategory[category] = 0;
                    }
                    totalByCategory[category] += total;
                }
            });
        });
        const resultArray = Object.keys(totalByCategory).map((category) => ({
            category: category,
            total: totalByCategory[category],
        }));
        return resultArray;
    }
}
exports.MongoGetAccountClosuresRepository = MongoGetAccountClosuresRepository;
