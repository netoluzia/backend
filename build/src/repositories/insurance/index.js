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
exports.InsuranceRepository = void 0;
const prisma_1 = require("../../database/prisma");
class InsuranceRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perPage, search } = payload;
            const skip = (page - 1) * perPage;
            const insurances = yield prisma_1.prisma.insurance.findMany({
                take: perPage,
                skip: skip,
                where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
            });
            const total = yield prisma_1.prisma.insurance.count();
            return { data: insurances, meta: { page, perPage, search, total } };
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurance = yield prisma_1.prisma.insurance.findUnique({ where: { id } });
            return { data: insurance };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurance = yield prisma_1.prisma.insurance.create({ data: payload });
            return { data: insurance };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurance = yield prisma_1.prisma.insurance.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: insurance };
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurance = yield prisma_1.prisma.insurance.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { data: insurance };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurance = yield prisma_1.prisma.insurance.delete({
                where: { id },
            });
            return { data: insurance };
        });
    }
}
exports.InsuranceRepository = InsuranceRepository;
