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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
let count = 1;
function generate(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let nameClean = removeAccents(name).toLowerCase();
        let nameParts = nameClean.split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts[nameParts.length - 1];
        let username = '$' + firstName + '.' + lastName;
        const exists = yield prisma_1.prisma.user.findUnique({ where: { username } });
        if (exists) {
            count += 1;
            yield generate(name + count);
        }
        const hashPawword = yield bcrypt_1.default.hash(firstName, 10);
        return { username, password: hashPawword };
    });
}
exports.generate = generate;
