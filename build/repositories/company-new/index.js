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
exports.CompanyRepository = void 0;
const prisma_1 = require("../../database/prisma");
class CompanyRepository {
    index(payload) {
        throw new Error('Method not implemented.');
    }
    indexByStatus(payload) {
        throw new Error('Method not implemented.');
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield prisma_1.prisma.company.findFirst();
            return { data: company };
        });
    }
    create(payload) {
        throw new Error('Method not implemented.');
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyData = yield prisma_1.prisma.company.findFirst();
            let company;
            if (companyData) {
                company = yield prisma_1.prisma.company.update({
                    where: { id: companyData.id },
                    data: Object.assign({}, payload),
                });
            }
            else {
                company = yield prisma_1.prisma.company.create({
                    data: payload,
                });
            }
            return { data: company };
        });
    }
    softDelete(id) {
        throw new Error('Method not implemented.');
    }
    destroy(id) {
        throw new Error('Method not implemented.');
    }
    searchByName(name) {
        throw new Error('Method not implemented.');
    }
    filter(search) {
        throw new Error('Method not implemented.');
    }
    invoiceFromInsurance(payload, insuranceId, statusOfDocument) {
        throw new Error('Method not implemented.');
    }
    invoiceFromCustomer(payload, insuranceId, statusOfDocument) {
        throw new Error('Method not implemented.');
    }
}
exports.CompanyRepository = CompanyRepository;
