"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoice = exports.createInvoice = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createInvoice = zod_1.z.object({
    customerId: zod_1.z.string(),
    type: zod_1.z.enum([
        client_1.InvoiceType.FR,
        client_1.InvoiceType.FT,
        client_1.InvoiceType.NC,
        client_1.InvoiceType.ND,
        client_1.InvoiceType.PP,
        client_1.InvoiceType.RC,
    ]),
    paymentId: zod_1.z.string().optional(),
    reasonInssuance: zod_1.z.string().optional(),
    invoiceId: zod_1.z.string().optional(),
    emission_date: zod_1.z.string().optional(),
    invoiceItems: zod_1.z.array(zod_1.z.object({
        serviceId: zod_1.z.string(),
        quantity: zod_1.z.number(),
        discount: zod_1.z.number(),
        price: zod_1.z.number(),
        total: zod_1.z.number(),
    })),
    amount_received: zod_1.z.number().optional(),
    hash64: zod_1.z.string(),
    hash4: zod_1.z.string(),
    total: zod_1.z.number(),
    discount: zod_1.z.number(),
    userId: zod_1.z.string(),
    serie: zod_1.z.string(),
    reference: zod_1.z.string(),
    status: zod_1.z.enum([
        client_1.InvoiceStatus.ANULADO,
        client_1.InvoiceStatus.PAGO,
        client_1.InvoiceStatus.POR_PAGAR,
        client_1.InvoiceStatus.RETIFICADO,
    ]),
});
exports.updateInvoice = zod_1.z.object({
    customerId: zod_1.z.string(),
    type: zod_1.z.enum([
        client_1.InvoiceType.FR,
        client_1.InvoiceType.FT,
        client_1.InvoiceType.NC,
        client_1.InvoiceType.ND,
        client_1.InvoiceType.PP,
        client_1.InvoiceType.RC,
    ]),
    amount_received: zod_1.z.number().optional(),
    paymentId: zod_1.z.string().optional(),
    reasonInssuance: zod_1.z.string().optional(),
    invoiceId: zod_1.z.string().optional(),
    emission_date: zod_1.z.string().optional(),
    invoiceItems: zod_1.z.array(zod_1.z.object({
        serviceId: zod_1.z.string(),
        quantity: zod_1.z.number(),
        discount: zod_1.z.number(),
        total: zod_1.z.number(),
    })),
});
