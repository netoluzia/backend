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
exports.FinanceController = void 0;
const global_interfaces_1 = require("../../types/global.interfaces");
class FinanceController {
    constructor(repository) {
        this.repository = repository;
    }
    receipt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.receipt();
                return {
                    message: global_interfaces_1.Message.OK,
                    status: global_interfaces_1.StatusCode.OK,
                    success: true,
                    body: { data: response },
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
exports.FinanceController = FinanceController;
