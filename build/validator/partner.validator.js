"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePartner = exports.createPartner = void 0;
const zod_1 = require("zod");
exports.createPartner = zod_1.z.object({
    name: zod_1.z.string(),
    nif: zod_1.z.string(),
    phone: zod_1.z.string().nullable(),
    address: zod_1.z.string().nullable(),
    email: zod_1.z.string().nullable(),
});
exports.updatePartner = zod_1.z.object({
    name: zod_1.z.string().optional(),
    nif: zod_1.z.string().optional(),
    phone: zod_1.z.string().nullable(),
    address: zod_1.z.string().nullable(),
    email: zod_1.z.string().nullable(),
});
