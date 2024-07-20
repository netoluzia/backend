"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const prisma_1 = require("../../database/prisma");
class ServiceRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const services = yield prisma_1.prisma.service.findMany({
                take: perPage,
                skip: skip,
                where: search
                    ? {
                        AND: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { deletedAt: null },
                            { category: payload.category || 'ENF' },
                        ],
                    }
                    : {
                        AND: [
                            { deletedAt: null },
                            { category: payload.category || 'ENF' },
                        ],
                    },
                orderBy: JSON.parse(orderBy),
            });
            const total = yield prisma_1.prisma.service.count({
                where: {
                    AND: [
                        { deletedAt: null },
                        { category: payload.category || 'ENF' },
                    ],
                },
            });
            return {
                data: services,
                meta: {
                    page,
                    perPage,
                    search,
                    total,
                    totalPages: Math.ceil(total / perPage),
                },
            };
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield prisma_1.prisma.service.findUnique({
                where: { id },
                include: {
                    serviceExpendableMaterial: {
                        include: { expendableMaterial: { select: { name: true } } },
                    },
                },
            });
            return { data: service };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { materials } = payload, rest = __rest(payload, ["materials"]);
            let service;
            service = yield prisma_1.prisma.service.create({
                data: Object.assign(Object.assign({}, rest), { deletedAt: null }),
            });
            if (materials) {
                service = yield prisma_1.prisma.service.update({
                    where: { id: service.id },
                    data: {
                        serviceExpendableMaterial: {
                            createMany: {
                                data: materials.map((item) => ({
                                    expendableMaterialId: item.expendableMaterialId,
                                    quantity: item.quantity,
                                })),
                            },
                        },
                    },
                });
            }
            return { data: service };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { materials } = payload, rest = __rest(payload, ["materials"]);
            let service;
            service = yield prisma_1.prisma.service.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            if (materials) {
                service = yield prisma_1.prisma.service.update({
                    where: { id },
                    data: {
                        serviceExpendableMaterial: {
                            createMany: {
                                data: materials.map((item) => ({
                                    expendableMaterialId: item.expendableMaterialId,
                                    quantity: item.quantity,
                                })),
                            },
                            // connectOrCreate: [
                            //   {
                            //     where: { expendableMaterialId: materials[0].expendableMaterialId }
                            //   }
                            // ]
                        },
                    },
                });
            }
            return { data: service };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield prisma_1.prisma.service.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: service };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield prisma_1.prisma.service.delete({
                where: { id },
            });
            return { data: service };
        });
    }
}
exports.ServiceRepository = ServiceRepository;
