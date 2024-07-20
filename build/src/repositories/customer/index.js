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
exports.CustomerRepository = void 0;
const prisma_1 = require("../../database/prisma");
class CustomerRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const customers = yield prisma_1.prisma.customer.findMany({
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
                include: {
                    insurance: true,
                    protocol: true,
                },
            });
            const total = yield prisma_1.prisma.customer.count({
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
            });
            return {
                data: customers,
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
            const customer = yield prisma_1.prisma.customer.findUnique({
                where: { id },
                include: { insurance: true, protocol: true, _count: true },
            });
            return { data: customer };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield prisma_1.prisma.customer.create({
                data: Object.assign({ deletedAt: null }, payload),
            });
            return { data: customer };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.customer.update({
                where: { id },
                data: {
                    address: null,
                    email: null,
                    insuranceId: null,
                    nif: null,
                    phone: null,
                    source: null,
                    protocolId: null,
                    partnerId: null,
                    name: undefined,
                    insurance_number: null,
                },
            });
            const customer = yield prisma_1.prisma.customer.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: customer };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield prisma_1.prisma.customer.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: customer };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield prisma_1.prisma.customer.delete({
                where: { id },
            });
            return { data: customer };
        });
    }
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = yield prisma_1.prisma.customer.findMany({
                where: {
                    name: { contains: name, mode: 'insensitive' },
                },
                include: {
                    insurance: true,
                    protocol: true,
                },
            });
            return { data: customers };
        });
    }
}
exports.CustomerRepository = CustomerRepository;
