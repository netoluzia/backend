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
exports.GetUserController = void 0;
class GetUserController {
    constructor(getUserRepository) {
        this.getUserRepository = getUserRepository;
    }
    getUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield this.getUserRepository.getUser(payload));
                return {
                    body: {
                        data: user,
                        message: 'Operação concluída com sucesso',
                        status: true,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: error.message,
                        status: true,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.GetUserController = GetUserController;
