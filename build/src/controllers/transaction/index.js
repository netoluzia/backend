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
exports.TransactionController = void 0;
const global_interfaces_1 = require("../../types/global.interfaces");
class TransactionController {
    constructor(repository) {
        this.repository = repository;
    }
    addStock(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.addStock(id, amount);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: { data: response },
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
    subtractStock(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.subtractStock(id, amount);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: { data: response },
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
    reportMonthly(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.reportMonthly(month, year);
                return {
                    message: global_interfaces_1.Message.OK,
                    body: { data: response },
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
exports.TransactionController = TransactionController;
