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
exports.UpdateClientController = void 0;
class UpdateClientController {
    constructor(updateClientRepository) {
        this.updateClientRepository = updateClientRepository;
    }
    handle(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.updateClientRepository.updateClient(id, params);
                return {
                    statusCode: 200,
                    body: {
                        data: client,
                        message: 'Cliente adicionado com sucesso',
                        status: true,
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
exports.UpdateClientController = UpdateClientController;
