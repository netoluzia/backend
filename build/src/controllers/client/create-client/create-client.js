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
exports.CreateClientController = void 0;
class CreateClientController {
    constructor(createClientRepository) {
        this.createClientRepository = createClientRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = params;
                if (!name) {
                    return {
                        statusCode: 400,
                        body: {
                            message: 'Missing fields',
                            status: false,
                        },
                    };
                }
                const client = yield this.createClientRepository.createClient(Object.assign(Object.assign({}, params), { createdAt: new Date() }));
                return {
                    statusCode: 200,
                    body: {
                        data: client,
                        status: true,
                        message: 'Cliente adicionado com sucesso',
                    },
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: {
                        message: 'Something went wrong',
                        status: false,
                    },
                };
            }
        });
    }
}
exports.CreateClientController = CreateClientController;
