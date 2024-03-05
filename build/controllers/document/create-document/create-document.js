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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentController = void 0;
const crypto_1 = __importDefault(require("crypto"));
class CreateDocumentController {
    constructor(createDocumentRepository) {
        this.createDocumentRepository = createDocumentRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { items } = params;
                const total = items.reduce((accumulator, item) => {
                    return accumulator + item.total;
                }, 0);
                const [ano, mes, dia, hora, minuto, segundo] = new Date().toLocaleString().match(/(\d+)/g) || [];
                const document = yield this.createDocumentRepository.createDocument(Object.assign(Object.assign({}, params), { total, serie: new Date().getFullYear(), reference: `${dia}${mes}${ano}${hora}${minuto}${segundo}`, hash64: crypto_1.default
                        .createHash('sha256')
                        .update(`${dia}${mes}${ano}${hora}${minuto}${segundo}`)
                        .digest('hex'), hash4: crypto_1.default
                        .createHash('sha256')
                        .update(`${dia}${mes}${ano}${hora}${minuto}${segundo}`)
                        .digest('hex')
                        .slice(0, 4) }));
                return {
                    statusCode: 200,
                    body: {
                        message: 'Documento criado com sucesso',
                        data: document,
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
exports.CreateDocumentController = CreateDocumentController;
