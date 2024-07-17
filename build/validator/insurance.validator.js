"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInsurance = exports.createInsurance = void 0;
const zod_1 = require("zod");
exports.createInsurance = zod_1.z.object({
    name: zod_1.z.string(),
    nif: zod_1.z.string(),
    address: zod_1.z.string().nullable(),
    phone: zod_1.z.string().nullable(),
});
exports.updateInsurance = zod_1.z.object({
    name: zod_1.z.string().optional(),
    nif: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
});
