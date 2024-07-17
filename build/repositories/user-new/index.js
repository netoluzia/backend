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
exports.UserRepository = void 0;
const prisma_1 = require("../../database/prisma");
class UserRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const users = yield prisma_1.prisma.user.findMany({
                take: perPage,
                skip: skip,
                where: search
                    ? {
                        AND: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { deletedAt: null },
                        ],
                    }
                    : { deletedAt: null },
                orderBy: JSON.parse(orderBy),
            });
            const total = yield prisma_1.prisma.user.count({ where: { deletedAt: null } });
            return {
                data: users,
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
            const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
            return { data: user };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.create({
                data: Object.assign(Object.assign({}, payload), { deletedAt: null }),
            });
            return { data: user };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: user };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: user };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.delete({
                where: { id },
            });
            return { data: user };
        });
    }
}
exports.UserRepository = UserRepository;
