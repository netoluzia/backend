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
exports.DeleteProductController = void 0;
class DeleteProductController {
    constructor(deleteProductRepository) {
        this.deleteProductRepository = deleteProductRepository;
    }
    handle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.deleteProductRepository.deleteProduct(id);
                return {
                    body: {
                        message: 'Produto eliminado com sucesso',
                        data: product,
                        status: true,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: 'Ocorreu um erro',
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.DeleteProductController = DeleteProductController;
