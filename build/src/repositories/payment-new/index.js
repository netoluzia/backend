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
exports.PaymentRepository = void 0;
const prisma_1 = require("../../database/prisma");
class PaymentRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const payments = yield prisma_1.prisma.payment.findMany({
                take: perPage,
                skip: skip,
                where: search
                    ? {
                        AND: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { deletedAt: null },
                        ],
                    }
                    : {
                        AND: [{ deletedAt: null }],
                    },
                orderBy: JSON.parse(orderBy),
            });
            const total = yield prisma_1.prisma.payment.count({
                where: {
                    AND: [{ deletedAt: null }],
                },
            });
            return {
                data: payments,
                meta: {
                    page,
                    perPage,
                    search,
                    total,
                    totalPages: Math.ceil(total / perPage),
                },
            };
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.prisma.payment.findUnique({
                where: { id },
            });
            return { data: payment };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.prisma.payment.create({
                data: Object.assign(Object.assign({}, payload), { deletedAt: null }),
            });
            return { data: payment };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.prisma.payment.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: payment };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.prisma.payment.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: payment };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.prisma.payment.delete({
                where: { id },
            });
            return { data: payment };
        });
    }
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const materials = yield prisma_1.prisma.payment.findMany({
                where: {
                    name: { contains: name, mode: 'insensitive' },
                },
            });
            return { data: materials };
        });
    }
}
exports.PaymentRepository = PaymentRepository;
