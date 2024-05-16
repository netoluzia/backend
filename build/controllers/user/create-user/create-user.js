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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUserController {
    constructor(createUserRepository, getUserRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserRepository = getUserRepository;
    }
    generateRandomString(length) {
        return [...Array(length)]
            .map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62)))
            .join('');
    }
    // Exemplo de uso da função para gerar uma string aleatória com 3 caracteres
    removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    generate(name) {
        let nameClean = this.removeAccents(name).toLowerCase();
        let nameParts = nameClean.split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts[nameParts.length - 1];
        let username = '$' + firstName + '.' + lastName;
        return username;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!httpRequest.body) {
                    return {
                        statusCode: 400,
                        body: {
                            message: 'Please, specify a body',
                            status: false,
                        },
                    };
                }
                const { body } = httpRequest;
                const { name, email } = body;
                const { username: auxUsername, password } = body, rest = __rest(body, ["username", "password"]);
                const userEmail = yield this.getUserRepository.getUser({ email });
                if (userEmail) {
                    return {
                        body: {
                            message: 'Este email já está registrado. Tente outro',
                            status: false,
                        },
                        statusCode: 204,
                    };
                }
                let username;
                let userName = null;
                let count = 0;
                do {
                    username = this.generate(count > 0 ? name : name + this.generateRandomString(count));
                    userName = yield this.getUserRepository.getUser({ username });
                    count += 1;
                } while (userName);
                const hashPawword = yield bcrypt_1.default.hash(password, 10);
                const user = yield this.createUserRepository.createUser(Object.assign({ username: username, password: hashPawword }, rest));
                return {
                    statusCode: 200,
                    body: {
                        data: user,
                        message: 'Usuario criado com sucesso',
                        status: true,
                    },
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: {
                        message: error.message,
                        status: false,
                    },
                };
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
