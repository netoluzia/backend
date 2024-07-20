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
exports.LoginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    constructor(getUserRepository) {
        this.getUserRepository = getUserRepository;
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ email: user.email }, 'your_secret_key', {
            expiresIn: '8h',
        });
    }
    handle(form) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = form;
                const user = yield this.getUserRepository.getUser({ username });
                if (!user) {
                    return {
                        body: {
                            message: 'Usuário inválido',
                            status: false,
                        },
                        statusCode: 400,
                    };
                }
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    return {
                        body: {
                            message: 'Palavra-passe errada',
                            status: false,
                        },
                        statusCode: 400,
                    };
                }
                const token = this.generateToken(user);
                return {
                    body: {
                        data: Object.assign(Object.assign({}, user), { token }),
                        message: 'Login feito com sucesso',
                        status: true,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: 'Something went wrong',
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.LoginController = LoginController;
