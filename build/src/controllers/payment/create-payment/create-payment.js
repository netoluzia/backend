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
exports.CreatePaymentController = void 0;
class CreatePaymentController {
    constructor(createPaymentRepository) {
        this.createPaymentRepository = createPaymentRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, title } = params;
                if (!code || !title) {
                    return {
                        statusCode: 400,
                        body: {
                            message: 'Missing some fields',
                            status: false,
                        },
                    };
                }
                const payment = yield this.createPaymentRepository.createPayment(params);
                return {
                    statusCode: 201,
                    body: {
                        data: payment,
                        status: true,
                        message: 'Método de pagamento adicionado com sucesso',
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
exports.CreatePaymentController = CreatePaymentController;
