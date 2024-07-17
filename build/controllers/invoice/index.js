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
exports.InvoiceController = void 0;
const global_interfaces_1 = require("../../types/global.interfaces");
const invoice_validator_1 = require("../../validator/invoice.validator");
const invoice_1 = require("../../utils/invoice");
class InvoiceController {
    constructor(repository) {
        this.repository = repository;
    }
    index(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.index(payload);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: error.message,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    indexByStatus(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository.indexByStatus)
                    throw new Error('Deu merda');
                const response = yield this.repository.indexByStatus(payload);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.show(id);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payloadToValidate = payload;
                payloadToValidate.hash4 = (0, invoice_1.generateHashes)(4);
                payloadToValidate.hash64 = (0, invoice_1.generateHashes)(64);
                payloadToValidate.reference = yield (0, invoice_1.generateReference)(payload.type);
                payloadToValidate.serie = String(new Date().getFullYear());
                if (payload.type == 'FR' || payload.type == 'RC') {
                    if (payload.amount_received && payload.amount_received < payload.total)
                        throw new Error('Insira um montante válido');
                    payloadToValidate.status = 'PAGO';
                }
                if (payload.type == 'NC' ||
                    payload.type == 'RC' ||
                    payload.type == 'ND') {
                    if (payload.invoiceId)
                        throw new Error('Insira uma referência válida');
                }
                if (payload.type == 'FT') {
                    payloadToValidate.status = 'POR_PAGAR';
                }
                const payloadValidated = invoice_validator_1.createInvoice.parse(payloadToValidate);
                const response = yield this.repository.create(payloadValidated);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: error.message,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payloadValidated = invoice_validator_1.updateInvoice.parse(payload);
                const response = yield this.repository.update(id, payloadValidated);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.softDelete(id);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.destroy(id);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    filter(search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository.filter)
                    throw new Error('Nao implemementado');
                const response = yield this.repository.filter(search);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
    invoiceFromInsurance(payload, insuranceId, statusOfDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository.invoiceFromInsurance)
                    throw new Error('Nor implemeyted');
                const response = yield this.repository.invoiceFromInsurance(payload, insuranceId, statusOfDocument);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: response,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
            catch (error) {
                return {
                    message: error.message,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                };
            }
        });
    }
}
exports.InvoiceController = InvoiceController;
