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
exports.ReportPerMonthController = void 0;
class ReportPerMonthController {
    constructor(repository) {
        this.repository = repository;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield this.repository.reportPerMonth();
                return {
                    body: {
                        message: 'Operação concluída com sucesso',
                        status: true,
                        data: report,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: 'Operação falhou',
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.ReportPerMonthController = ReportPerMonthController;
