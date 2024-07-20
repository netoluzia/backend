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
exports.ReportRepository = void 0;
const prisma_1 = require("../../database/prisma");
class ReportRepository {
    receiptByArea() {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield prisma_1.prisma.invoiceItem.findMany({
                where: {
                    invoice: {
                        status: 'PAGO',
                    },
                },
                include: {
                    service: { select: { category: true } },
                },
            });
            const groupedSums = reports.reduce((acc, item) => {
                const category = item.service.category;
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += item.total; // Soma o campo total de cada item
                return acc;
            }, {});
            const result = Object.entries(groupedSums).map(([category, total]) => ({
                category,
                total,
            }));
        });
    }
}
exports.ReportRepository = ReportRepository;
