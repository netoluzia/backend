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
exports.ProtocolController = void 0;
const global_interfaces_1 = require("../../types/global.interfaces");
const protocol_validator_1 = require("../../validator/protocol.validator");
class ProtocolController {
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
                const payloadValidated = protocol_validator_1.createProtocol.parse(payload);
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
                const payloadValidated = protocol_validator_1.updateProtocol.parse(payload);
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
                    message: error.message,
                    status: 500,
                    success: false,
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
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository.searchByName)
                    throw new Error('Nao implementado');
                const response = yield this.repository.searchByName(name);
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
}
exports.ProtocolController = ProtocolController;
