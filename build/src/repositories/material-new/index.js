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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpendableMaterialRepository = void 0;
const prisma_1 = require("../../database/prisma");
class ExpendableMaterialRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const expendableMaterials = yield prisma_1.prisma.expendableMaterial.findMany({
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
            const total = yield prisma_1.prisma.expendableMaterial.count({
                where: {
                    AND: [
                        { deletedAt: null },
                        { category: payload.category || 'ENF' },
                    ],
                },
            });
            return {
                data: expendableMaterials,
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
            const expendableMaterial = yield prisma_1.prisma.expendableMaterial.findUnique({
                where: { id },
            });
            return { data: expendableMaterial };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const expendableMaterial = yield prisma_1.prisma.expendableMaterial.create({
                data: Object.assign(Object.assign({}, payload), { deletedAt: null }),
            });
            return { data: expendableMaterial };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const expendableMaterial = yield prisma_1.prisma.expendableMaterial.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: expendableMaterial };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expendableMaterial = yield prisma_1.prisma.expendableMaterial.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: expendableMaterial };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expendableMaterial = yield prisma_1.prisma.expendableMaterial.delete({
                where: { id },
            });
            return { data: expendableMaterial };
        });
    }
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const materials = yield prisma_1.prisma.expendableMaterial.findMany({
                where: {
                    name: { contains: name, mode: 'insensitive' },
                },
            });
            return { data: materials };
        });
    }
}
exports.ExpendableMaterialRepository = ExpendableMaterialRepository;
