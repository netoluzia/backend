"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProtocol = exports.createProtocol = void 0;
const zod_1 = require("zod");
exports.createProtocol = zod_1.z.object({
    name: zod_1.z.string(),
    value: zod_1.z.number(),
});
exports.updateProtocol = zod_1.z.object({
    name: zod_1.z.string().optional(),
    value: zod_1.z.number().optional(),
});
