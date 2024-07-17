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
exports.PartnerRepository = void 0;
const prisma_1 = require("../../database/prisma");
class PartnerRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search, orderBy } = payload;
            const skip = (page - 1) * perPage;
            const partners = yield prisma_1.prisma.partner.findMany({
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
                include: {
                    _count: { select: { customer: true } },
                },
            });
            const total = yield prisma_1.prisma.partner.count({
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
            });
            return {
                data: partners,
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
            const partner = yield prisma_1.prisma.partner.findUnique({
                where: { id },
                include: { _count: { select: { customer: true } } },
            });
            return { data: partner };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const partner = yield prisma_1.prisma.partner.create({
                data: Object.assign({ deletedAt: null }, payload),
            });
            return { data: partner };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const partner = yield prisma_1.prisma.partner.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: partner };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const partner = yield prisma_1.prisma.partner.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: partner };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const partner = yield prisma_1.prisma.partner.delete({
                where: { id },
            });
            return { data: partner };
        });
    }
}
exports.PartnerRepository = PartnerRepository;
