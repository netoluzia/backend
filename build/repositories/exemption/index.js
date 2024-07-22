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
exports.ExemptionRepository = void 0;
const prisma_1 = require("../../database/prisma");
class ExemptionRepository {
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const exemptions = yield prisma_1.prisma.exemption.findMany({});
            return {
                data: exemptions,
            };
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exemption = yield prisma_1.prisma.exemption.findUnique({
                where: { id },
            });
            return { data: exemption };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const exemption = yield prisma_1.prisma.exemption.create({
                data: Object.assign({}, payload),
            });
            return { data: exemption };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const exemption = yield prisma_1.prisma.exemption.update({
                where: { id },
                data: Object.assign({}, payload),
            });
            return { data: exemption };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exemption = yield prisma_1.prisma.exemption.delete({
                where: { id },
            });
            return { data: exemption };
        });
    }
    softDelete(id) {
        throw new Error('Method not implemented.');
    }
}
exports.ExemptionRepository = ExemptionRepository;
