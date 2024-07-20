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
exports.MongoCountDocuments = void 0;
const mongo_1 = require("../../../database/mongo");
class MongoCountDocuments {
    count(document) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield mongo_1.MongoClient.db
                .collection('document')
                .aggregate([
                {
                    $match: {
                        document: document,
                    },
                },
                {
                    $count: 'total',
                },
            ])
                .toArray();
            return ((_a = doc[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        });
    }
}
exports.MongoCountDocuments = MongoCountDocuments;
