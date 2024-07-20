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
                    invoiceSource: {
                        include: {
                            customer: { select: { name: true } },
                        },
                    },
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
                            status == 'PAGO'
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
                                    status: status,
                                },
                        ],
                    }
                    : {
                        AND: [
                            status == 'PAGO'
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
                                    status: status,
                                },
                        ],
                    },
                include: {
                    customer: true,
                    invoiceSource: {
                        include: {
                            customer: { select: { name: true } },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            const total = yield prisma_1.prisma.invoice.count({
                where: {
                    AND: [
                        status == 'PAGO'
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
                                status: status,
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
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield prisma_1.prisma.invoice.findUnique({
                where: { id },
                include: {
                    invoiceItems: { include: { service: true } },
                    customer: {
                        include: { insurance: true, Partner: true, protocol: true },
                    },
                    payment: true,
                    user: true,
                    invoiceSource: {
                        include: {
                            customer: {
                                include: { insurance: true, Partner: true, protocol: true },
                            },
                            invoiceItems: { include: { service: true } },
                        },
                    },
                },
            });
            return { data: invoice };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { invoiceItems, emission_date, invoiceId, amount_received } = payload, rest = __rest(payload, ["invoiceItems", "emission_date", "invoiceId", "amount_received"]);
            let invoice;
            if ((invoiceItems === null || invoiceItems === void 0 ? void 0 : invoiceItems.length) &&
                (payload.type == 'FR' || payload.type == 'FT' || payload.type == 'PP')) {
                invoice = yield prisma_1.prisma.invoice.create({
                    data: Object.assign({ emission_date: payload.emission_date
                            ? new Date(payload.emission_date)
                            : new Date(), amount_received: payload.amount_received, invoiceId: payload.invoiceId || null, invoiceItems: {
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
            }
            else {
                invoice = yield prisma_1.prisma.invoice.create({
                    data: Object.assign(Object.assign({ emission_date: payload.emission_date
                            ? new Date(payload.emission_date)
                            : new Date() }, rest), { invoiceId,
                        amount_received }),
                    include: {
                        invoiceSource: true,
                    },
                });
                if (invoiceId)
                    yield prisma_1.prisma.invoice.update({
                        where: { id: invoiceId },
                        data: {
                            status: payload.type == 'RC' ? 'PAGO' : 'FINAL',
                        },
                    });
            }
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
                take: perPage,
                skip: skip,
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
    invoiceFromInsuranceTotal(insuranceId, statusOfDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield prisma_1.prisma.invoice.aggregate({
                where: {
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
                _sum: {
                    total: true,
                },
            });
            return {
                data: invoices._sum.total,
            };
        });
    }
    invoiceFromCustomer(payload, customerId, statusOfDocument) {
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
                                customerId,
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
                                    AND: [
                                        {
                                            type: 'FT',
                                        },
                                        {
                                            status: 'POR_PAGAR',
                                        },
                                    ],
                                },
                        ],
                    }
                    : {
                        AND: [
                            {
                                customerId,
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
                                    AND: [
                                        {
                                            type: 'FT',
                                        },
                                        {
                                            status: 'POR_PAGAR',
                                        },
                                    ],
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
                                customerId,
                            },
                            {
                                status: statusOfDocument,
                            },
                        ],
                    }
                    : {
                        AND: [
                            {
                                customerId,
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
