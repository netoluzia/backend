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
exports.BalanceController = void 0;
const prisma_1 = require("../../database/prisma");
class BalanceController {
    aggregateInvoiceCategories(invoices) {
        const categoryMap = {};
        for (const invoice of invoices) {
            for (const item of invoice.invoiceItems) {
                const category = item.service.category;
                const total = item.total;
                if (categoryMap[category]) {
                    categoryMap[category] += total;
                }
                else {
                    categoryMap[category] = total;
                }
            }
        }
        const categories = {
            FAR: 'Farmácia',
            LAB: 'Laboratório',
            ESP: 'Especialidade',
            ECO: 'Ecografia',
            RX: 'Raio-X',
            EST: 'Estomatologia',
            ENF: 'Enfermaria',
        };
        const result = [];
        for (const category in categoryMap) {
            if (categoryMap.hasOwnProperty(category)) {
                result.push({
                    category: categories[category],
                    total: categoryMap[category],
                });
            }
        }
        return result;
    }
    getDayRange(year, month, day) {
        const start = new Date(year, month - 1, day, 0, 0, 0, 0);
        const end = new Date(year, month - 1, day, 23, 59, 59, 999);
        return { start, end };
    }
    getMonthRange(year, month) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        return { start, end };
    }
    show(type, range) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [year, month, day] = range.split('-');
                const { start, end } = type == 'month'
                    ? this.getMonthRange(Number(year), Number(month))
                    : this.getDayRange(Number(year), Number(month), Number(day));
                const invoices = yield prisma_1.prisma.invoice.findMany({
                    where: {
                        emission_date: {
                            gte: start,
                            lte: end,
                        },
                        OR: [
                            {
                                type: 'FR',
                            },
                            {
                                type: 'RC',
                            },
                        ],
                    },
                    select: {
                        invoiceItems: {
                            select: {
                                service: {
                                    select: { category: true },
                                },
                                total: true,
                            },
                        },
                    },
                });
                const result = this.aggregateInvoiceCategories(invoices);
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
}
exports.BalanceController = BalanceController;
