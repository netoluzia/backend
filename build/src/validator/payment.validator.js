"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePayment = exports.createPayment = void 0;
const zod_1 = require("zod");
exports.createPayment = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.string(),
});
exports.updatePayment = zod_1.z.object({
    name: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
});
