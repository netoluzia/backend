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
exports.CreateAttendingController = void 0;
class CreateAttendingController {
    constructor(createAttendingRepository) {
        this.createAttendingRepository = createAttendingRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { attendant, client, items } = params;
                if (!attendant || client || (items === null || items === void 0 ? void 0 : items.length)) {
                    return {
                        body: {
                            message: 'Faltando campos obrigatórios',
                            status: false,
                        },
                        statusCode: 400,
                    };
                }
                const attending = yield this.createAttendingRepository.createAttending(params);
                return {
                    body: {
                        message: 'Operação concluída com sucesso',
                        status: true,
                        data: attending,
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
exports.CreateAttendingController = CreateAttendingController;
