"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = exports.createService = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createService = zod_1.z.object({
    name: zod_1.z.string(),
    unit_price: zod_1.z.number(),
    // sale_price: z.number().optional(),
    tax: zod_1.z.number().optional(),
    hasIva: zod_1.z.boolean().optional(),
    category: zod_1.z.enum([
        client_1.Category.ECO,
        client_1.Category.ENF,
        client_1.Category.ESP,
        client_1.Category.EST,
        client_1.Category.FAR,
        client_1.Category.LAB,
        client_1.Category.RX,
    ]),
    type: zod_1.z.enum([client_1.TypeItem.PRODUCT, client_1.TypeItem.SERVICE]),
    account_code: zod_1.z.string().optional(),
    status: zod_1.z
        .enum([client_1.StatusService.AVAILABLE, client_1.StatusService.UNAVAILABE])
        .optional(),
    description: zod_1.z.string(),
    discount: zod_1.z.number().optional(),
    exemptionCode: zod_1.z.string().optional(),
    materials: zod_1.z
        .array(zod_1.z.object({ expendableMaterialId: zod_1.z.string(), quantity: zod_1.z.number() }))
        .optional(),
});
exports.updateService = zod_1.z.object({
    name: zod_1.z.string().optional(),
    unit_price: zod_1.z.number().optional(),
    // sale_price: z.number().optional(),
    tax: zod_1.z.number().optional(),
    hasIva: zod_1.z.boolean().optional(),
    category: zod_1.z.enum([
        client_1.Category.ECO,
        client_1.Category.ENF,
        client_1.Category.ESP,
        client_1.Category.EST,
        client_1.Category.FAR,
        client_1.Category.LAB,
        client_1.Category.RX,
    ]),
    type: zod_1.z.enum([client_1.TypeItem.PRODUCT, client_1.TypeItem.SERVICE]),
    account_code: zod_1.z.string().optional(),
    status: zod_1.z
        .enum([client_1.StatusService.AVAILABLE, client_1.StatusService.UNAVAILABE])
        .optional(),
    description: zod_1.z.string().optional(),
    discount: zod_1.z.number().optional(),
    exemptionCode: zod_1.z.string().optional(),
    materials: zod_1.z
        .array(zod_1.z.object({ expendableMaterialId: zod_1.z.string(), quantity: zod_1.z.number() }))
        .optional(),
});
