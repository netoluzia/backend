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
exports.GetDocumentsByDocuments = void 0;
class GetDocumentsByDocuments {
    constructor(getDocumentsByType) {
        this.getDocumentsByType = getDocumentsByType;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = yield this.getDocumentsByType.getDocumentsByType();
                return {
                    statusCode: 200,
                    body: {
                        data: documents,
                        message: 'Documentos carregados com sucesso',
                        status: true,
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
exports.GetDocumentsByDocuments = GetDocumentsByDocuments;
