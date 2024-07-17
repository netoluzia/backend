"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.createCustomer = void 0;
const zod_1 = require("zod");
exports.createCustomer = zod_1.z.object({
    name: zod_1.z.string(),
    nif: zod_1.z.string().optional(),
    address: zod_1.z.string().nullable(),
    phone: zod_1.z.string(),
    source: zod_1.z.string(),
    email: zod_1.z.string().optional(),
    insuranceId: zod_1.z.string().optional(),
    protocolId: zod_1.z.string().optional(),
    partnerId: zod_1.z.string().optional(),
    insurance_number: zod_1.z.string().optional(),
});
exports.updateCustomer = zod_1.z.object({
    name: zod_1.z.string().optional(),
    nif: zod_1.z.string().optional(),
    address: zod_1.z.string().nullable(),
    phone: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    insuranceId: zod_1.z.string().optional(),
    protocolId: zod_1.z.string().optional(),
    partnerId: zod_1.z.string().optional(),
    insurance_number: zod_1.z.string().optional(),
});
