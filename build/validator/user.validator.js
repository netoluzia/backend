"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createUser = zod_1.z.object({
    name: zod_1.z.string(),
    nif: zod_1.z.string().optional(),
    phone: zod_1.z.string(),
    role: zod_1.z.enum([
        client_1.Role.admin,
        client_1.Role.analyst,
        client_1.Role.attendant,
        client_1.Role.doctor,
        client_1.Role.financial,
        client_1.Role.nurse,
    ]),
    email: zod_1.z.string().optional(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.updateUser = zod_1.z.object({
    name: zod_1.z.string().optional(),
    nif: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    role: zod_1.z
        .enum([
        client_1.Role.admin,
        client_1.Role.analyst,
        client_1.Role.attendant,
        client_1.Role.doctor,
        client_1.Role.financial,
        client_1.Role.nurse,
    ])
        .optional(),
    email: zod_1.z.string().optional(),
});
