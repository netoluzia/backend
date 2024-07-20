"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.createCompany = void 0;
const zod_1 = require("zod");
exports.createCompany = zod_1.z.object({
    name: zod_1.z.string(),
    nif: zod_1.z.string(),
    address: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string(),
    bank: zod_1.z.string().optional(),
    iban: zod_1.z.string().optional(),
    account_number: zod_1.z.string().optional(),
});
exports.updateCompany = zod_1.z.object({
    name: zod_1.z.string(),
    nif: zod_1.z.string(),
    address: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string(),
    bank: zod_1.z.string().optional(),
    iban: zod_1.z.string().optional(),
    account_number: zod_1.z.string().optional(),
});
