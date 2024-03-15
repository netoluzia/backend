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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentController = void 0;
const mongodb_1 = require("mongodb");
const crypto_1 = __importDefault(require("crypto"));
class CreateDocumentController {
    constructor(createDocumentRepository) {
        this.createDocumentRepository = createDocumentRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { items, client, payment } = params;
                const auxItems = items.map((_a) => {
                    var { quantity, unit_price, total } = _a, rest = __rest(_a, ["quantity", "unit_price", "total"]);
                    return (Object.assign(Object.assign({ total: quantity * unit_price }, rest), { unit_price,
                        quantity }));
                });
                const total = auxItems.reduce((accumulator, item) => {
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
                        .slice(0, 4), createdAt: new Date(), emission_date: params.emission_date || new Date(), client: new mongodb_1.ObjectId(client), payment: new mongodb_1.ObjectId(payment), items: auxItems }));
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
