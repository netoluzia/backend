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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRepository = void 0;
const prisma_1 = require("../../database/prisma");
class InvoiceRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, category } = payload;
            const skip = (page - 1) * perPage;
            const invoices = yield prisma_1.prisma.invoice.findMany({
                take: perPage,
                skip: skip,
                where: search
                    ? {
                        AND: [
                            {
                                reference: { contains: search, mode: 'insensitive' },
                            },
                            {
                                type: category,
                            },
                        ],
                    }
                    : { type: category },
                include: {
                    customer: true,
                    invoiceSource: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            const total = yield prisma_1.prisma.invoice.count({
                where: search
                    ? {
                        AND: [
                            {
                                reference: { contains: search, mode: 'insensitive' },
                            },
                            {
                                type: category,
                            },
                        ],
                    }
                    : { type: category },
            });
            return {
                data: invoices,
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
    indexByStatus(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, status } = payload;
            const skip = (page - 1) * perPage;
            const invoices = yield prisma_1.prisma.invoice.findMany({
                take: perPage,
                skip: skip,
                where: search
                    ? {
                        AND: [
                            {
                                reference: { contains: search, mode: 'insensitive' },
                            },
                            {
                                status: status,
                            },
                        ],
                    }
                    : { status: status },
                include: {
                    customer: true,
                    invoiceSource: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            const total = yield prisma_1.prisma.invoice.count({
                where: search
                    ? {
                        AND: [
                            {
                                reference: { contains: search, mode: 'insensitive' },
                            },
                            {
                                status: status,
                            },
                        ],
                    }
                    : { status: status },
            });
            return {
                data: invoices,
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
            const invoice = yield prisma_1.prisma.invoice.findUnique({
                where: { id },
                include: {
                    invoiceItems: { include: { service: true } },
                    customer: true,
                    payment: true,
                    user: true,
                    invoiceSource: true,
                },
            });
            return { data: invoice };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { invoiceItems, emission_date, invoiceId, amount_received } = payload, rest = __rest(payload, ["invoiceItems", "emission_date", "invoiceId", "amount_received"]);
            const invoice = yield prisma_1.prisma.invoice.create({
                data: Object.assign({ emission_date: new Date(), amount_received: payload.amount_received, invoiceId: payload.invoiceId || null, invoiceItems: {
                        createMany: {
                            data: invoiceItems.map((item) => ({
                                discount: item.discount,
                                price: item.price,
                                quantity: item.quantity,
                                serviceId: item.serviceId,
                                total: item.total,
                            })),
                        },
                    } }, rest),
            });
            return { data: invoice };
        });
    }
    filter(search) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield prisma_1.prisma.invoice.findMany({
                where: {
                    AND: [
                        {
                            reference: { contains: search },
                        },
                        {
                            type: 'FT',
                        },
                        {
                            status: 'POR_PAGAR',
                        },
                    ],
                },
                include: {
                    customer: {
                        include: {
                            insurance: true,
                            protocol: true,
                            Partner: true,
                        },
                    },
                    invoiceItems: {
                        include: { service: { select: { name: true, description: true } } },
                    },
                },
            });
            return { data: invoices };
        });
    }
    invoiceFromInsurance(payload, insuranceId, statusOfDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const invoices = yield prisma_1.prisma.invoice.findMany({
                where: search
                    ? {
                        AND: [
                            {
                                reference: { contains: search, mode: 'insensitive' },
                            },
                            {
                                customer: {
                                    insuranceId: insuranceId,
                                },
                            },
                            statusOfDocument == 'PAGO'
                                ? {
                                    OR: [
                                        {
                                            type: 'FR',
                                        },
                                        {
                                            type: 'RC',
                                        },
                                    ],
                                }
                                : {
                                    type: 'FT',
                                },
                        ],
                    }
                    : {
                        AND: [
                            {
                                customer: {
                                    insuranceId: insuranceId,
                                },
                            },
                            statusOfDocument == 'PAGO'
                                ? {
                                    OR: [
                                        {
                                            type: 'FR',
                                        },
                                        {
                                            type: 'RC',
                                        },
                                    ],
                                }
                                : {
                                    type: 'FT',
                                },
                        ],
                    },
                include: {
                    customer: true,
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            const total = yield prisma_1.prisma.invoice.count({
                where: search
                    ? {
                        AND: [
                            {
                                reference: { contains: search, mode: 'insensitive' },
                            },
                            {
                                customer: {
                                    insuranceId: insuranceId,
                                },
                            },
                            {
                                status: statusOfDocument,
                            },
                        ],
                    }
                    : {
                        AND: [
                            {
                                customer: {
                                    insuranceId: insuranceId,
                                },
                            },
                            {
                                status: statusOfDocument,
                            },
                        ],
                    },
            });
            return {
                data: invoices,
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
    update(id, payload) {
        throw new Error('Method not implemented.');
    }
    softDelete(id) {
        throw new Error('Method not implemented.');
    }
    destroy(id) {
        throw new Error('Method not implemented.');
    }
}
exports.InvoiceRepository = InvoiceRepository;
