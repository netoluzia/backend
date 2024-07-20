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
exports.FinanceRepository = void 0;
const prisma_1 = require("../../database/prisma");
class FinanceRepository {
    receipt() {
        return __awaiter(this, void 0, void 0, function* () {
            const toReceive = yield prisma_1.prisma.invoice.aggregate({
                where: { AND: [{ status: 'POR_PAGAR' }, { type: 'FT' }] },
                _sum: {
                    total: true,
                },
            });
            const received = yield prisma_1.prisma.invoice.aggregate({
                where: { status: 'PAGO', OR: [{ type: 'FR' }, { type: 'RC' }] },
                _sum: {
                    total: true,
                },
            });
            return {
                toReceive: (toReceive === null || toReceive === void 0 ? void 0 : toReceive._sum.total) || 0,
                received: (received === null || received === void 0 ? void 0 : received._sum.total) || 0,
            };
        });
    }
}
exports.FinanceRepository = FinanceRepository;
