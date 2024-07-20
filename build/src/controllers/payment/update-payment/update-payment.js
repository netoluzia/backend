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
exports.UpdatePaymentController = void 0;
class UpdatePaymentController {
    constructor(updatePaymentRepository) {
        this.updatePaymentRepository = updatePaymentRepository;
    }
    handle(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield this.updatePaymentRepository.updatePayment(id, payload);
                return {
                    body: {
                        message: 'Pagamneto atualizado com sucesso',
                        data: payment,
                        status: true,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: 'Pagamento finalizado com erro',
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.UpdatePaymentController = UpdatePaymentController;
