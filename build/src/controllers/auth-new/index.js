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
exports.AuthController = void 0;
const global_interfaces_1 = require("../../types/global.interfaces");
const prisma_1 = require("../../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../utils/token");
class AuthController {
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = payload;
                const user = yield prisma_1.prisma.user.findUnique({ where: { username } });
                if (!user) {
                    return {
                        status: global_interfaces_1.StatusCode.UNAUTHORIZED,
                        message: global_interfaces_1.Message.UNKNOWN_USER,
                        success: false,
                    };
                }
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    return {
                        message: global_interfaces_1.Message.WRONG_PWD,
                        status: global_interfaces_1.StatusCode.UNAUTHORIZED,
                        success: false,
                    };
                }
                const token = (0, token_1.generateToken)(user);
                return {
                    message: global_interfaces_1.Message.LOGIN_SUCCEED,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                    body: {
                        data: Object.assign(Object.assign({}, user), { token }),
                    },
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.INTERNAL_ERROR,
                    status: global_interfaces_1.StatusCode.SERVER_ERROR,
                    success: false,
                };
            }
        });
    }
}
exports.AuthController = AuthController;
