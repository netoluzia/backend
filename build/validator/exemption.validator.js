"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExemption = exports.createExemption = void 0;
const zod_1 = require("zod");
exports.createExemption = zod_1.z.object({
    code: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.updateExemption = zod_1.z.object({
    code: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
