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
exports.ProtocolRepository = void 0;
const prisma_1 = require("../../database/prisma");
class ProtocolRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const protocols = yield prisma_1.prisma.protocol.findMany({
                take: perPage,
                skip: skip,
                where: search
                    ? {
                        AND: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { deletedAt: null },
                        ],
                    }
                    : {
                        AND: [{ deletedAt: null }],
                    },
                orderBy: JSON.parse(orderBy),
            });
            const total = yield prisma_1.prisma.protocol.count({
                where: {
                    AND: [{ deletedAt: null }],
                },
            });
            return { data: protocols, meta: { page, perPage, search, total } };
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocol = yield prisma_1.prisma.protocol.findUnique({
                where: { id },
            });
            return { data: protocol };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocol = yield prisma_1.prisma.protocol.create({
                data: Object.assign(Object.assign({}, payload), { deletedAt: null }),
            });
            return { data: protocol };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocol = yield prisma_1.prisma.protocol.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: protocol };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocol = yield prisma_1.prisma.protocol.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: protocol };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocol = yield prisma_1.prisma.protocol.delete({
                where: { id },
            });
            return { data: protocol };
        });
    }
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocols = yield prisma_1.prisma.protocol.findMany({
                where: {
                    name: { contains: name, mode: 'insensitive' },
                },
            });
            return { data: protocols };
        });
    }
}
exports.ProtocolRepository = ProtocolRepository;
