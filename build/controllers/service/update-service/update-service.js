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
exports.UpdateServiceController = void 0;
class UpdateServiceController {
    constructor(updateServiceRepository) {
        this.updateServiceRepository = updateServiceRepository;
    }
    handle(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, params } = payload;
                if (!params || !body) {
                    return {
                        statusCode: 400,
                        body: {
                            message: 'Bad request',
                            status: false,
                        },
                    };
                }
                const service = yield this.updateServiceRepository.updateService(params, Object.assign(Object.assign({}, body), { updatedAt: new Date() }));
                return {
                    statusCode: 200,
                    body: {
                        message: 'Item atualizado com sucesso',
                        data: service,
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
exports.UpdateServiceController = UpdateServiceController;
