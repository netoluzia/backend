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
exports.TransactionRepository = void 0;
const prisma_1 = require("../../database/prisma");
class TransactionRepository {
    addStock(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield prisma_1.prisma.expendableMaterial.findUnique({ where: { id } });
            if (stock) {
                yield prisma_1.prisma.expendableMaterial.update({
                    where: { id },
                    data: {
                        quantity: stock.quantity + amount,
                    },
                });
            }
            const transaction = yield prisma_1.prisma.transaction.create({
                data: {
                    quantity: amount,
                    type: 'ADD',
                    expendableMaterialId: id,
                },
            });
            return transaction;
        });
    }
    subtractStock(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield prisma_1.prisma.expendableMaterial.findUnique({ where: { id } });
            if (stock) {
                yield prisma_1.prisma.expendableMaterial.update({
                    where: { id },
                    data: {
                        quantity: stock.quantity - amount,
                    },
                });
            }
            const transaction = yield prisma_1.prisma.transaction.create({
                data: {
                    quantity: amount,
                    type: 'SUBTRACT',
                    expendableMaterialId: id,
                },
            });
            return transaction;
        });
    }
    reportMonthly(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);
            const transactions = yield prisma_1.prisma.transaction.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });
            const report = {};
            transactions.forEach((transaction) => {
                const { expendableMaterialId, type, quantity } = transaction;
                if (!report[expendableMaterialId]) {
                    report[expendableMaterialId] = { initialStock: 0, finalStock: 0 };
                }
                if (type === 'ADD') {
                    report[expendableMaterialId].finalStock += quantity;
                }
                else if (type === 'SUBTRACT') {
                    report[expendableMaterialId].finalStock -= quantity;
                }
            });
            for (const expendableMaterialId in report) {
                const initialStock = yield prisma_1.prisma.expendableMaterial.findUnique({
                    where: { id: expendableMaterialId },
                });
                report[expendableMaterialId].initialStock = initialStock
                    ? initialStock.quantity - report[expendableMaterialId].finalStock
                    : 0;
            }
            return report;
        });
    }
}
exports.TransactionRepository = TransactionRepository;
