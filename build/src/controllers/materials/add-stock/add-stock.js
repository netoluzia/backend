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
exports.AddStockController = void 0;
class AddStockController {
    constructor(repository) {
        this.repository = repository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stock = yield this.repository.addStock(params);
                return {
                    body: {
                        message: 'Operacao concluida com sucesso',
                        status: true,
                        data: stock,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: 'Operacao concluida com erros',
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.AddStockController = AddStockController;
