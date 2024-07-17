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
exports.generateReference = exports.generateHashes = void 0;
const prisma_1 = require("../database/prisma");
const generateHashes = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+[]{}|<>?';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateHashes = generateHashes;
function generateReference(document) {
    return __awaiter(this, void 0, void 0, function* () {
        const [dia, mes, ano] = new Date().toLocaleDateString('pt-BR').split('/');
        const count = yield prisma_1.prisma.invoice.count({
            where: { type: document },
        });
        return `${document} ${dia}${mes}${ano}/${count + 1}`;
    });
}
exports.generateReference = generateReference;
