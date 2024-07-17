"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpendableMaterial = exports.createExpendableMaterial = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createExpendableMaterial = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    category: zod_1.z.enum([
        client_1.Category.ECO,
        client_1.Category.ENF,
        client_1.Category.ESP,
        client_1.Category.EST,
        client_1.Category.FAR,
        client_1.Category.LAB,
        client_1.Category.RX,
    ]),
    measure: zod_1.z.enum([
        client_1.Measure.Unidade,
        client_1.Measure.Litro,
        client_1.Measure.Mililitro,
        client_1.Measure.Par,
    ]),
});
exports.updateExpendableMaterial = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    category: zod_1.z
        .enum([
        client_1.Category.ECO,
        client_1.Category.ENF,
        client_1.Category.ESP,
        client_1.Category.EST,
        client_1.Category.FAR,
        client_1.Category.LAB,
        client_1.Category.RX,
    ])
        .optional(),
    measure: zod_1.z
        .enum([client_1.Measure.Unidade, client_1.Measure.Litro, client_1.Measure.Mililitro, client_1.Measure.Par])
        .optional(),
    quantity: zod_1.z.number().optional(),
});
