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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentController = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class CreateDocumentController {
    constructor(createDocumentRepository, countDocumentType) {
        this.createDocumentRepository = createDocumentRepository;
        this.countDocumentType = countDocumentType;
    }
    calculateTotal(items) {
        return items.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.unit_price;
        }, 0);
    }
    generateReference(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const [dia, mes, ano] = new Date().toLocaleDateString('pt-BR').split('/');
            return `${document}${dia}${mes}${ano}/${(yield this.countDocumentType.count(document)) + 1}`;
        });
    }
    signature() {
        return __awaiter(this, void 0, void 0, function* () {
            const hash64 = '64';
            const hash4 = '4';
            return { hash64, hash4 };
        });
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { items, client, payment, document, amount_received, paid, source, attendant, } = params;
                const auxItems = items.map((_a) => {
                    var { total, quantity, unit_price } = _a, rest = __rest(_a, ["total", "quantity", "unit_price"]);
                    return (Object.assign({ total: quantity * unit_price, quantity,
                        unit_price }, rest));
                });
                paid = false;
                const total = this.calculateTotal(items);
                const reference = yield this.generateReference(document);
                let change = null;
                if (document == 'RC' || document == 'FR') {
                    change = amount_received - total;
                    paid = true;
                }
                if (document == 'RC') {
                    yield mongo_1.MongoClient.db
                        .collection('document')
                        .findOneAndUpdate({ reference: source }, { $set: { paid: true } });
                }
                if (document == 'RC' && !source) {
                    return {
                        statusCode: 200,
                        body: {
                            message: 'Introduza a referencia do documento de origem',
                            status: true,
                        },
                    };
                }
                const { hash4, hash64 } = yield this.signature();
                const doc = yield this.createDocumentRepository.createDocument(Object.assign(Object.assign({}, params), { total,
                    reference, serie: new Date().getFullYear(), createdAt: new Date(), emission_date: params.emission_date || new Date(), client: new mongodb_1.ObjectId(client), payment: payment ? new mongodb_1.ObjectId(payment) : null, items: auxItems, amount_received, change: change, hash4,
                    hash64,
                    paid, attendant: new mongodb_1.ObjectId(attendant) }));
                return {
                    statusCode: 200,
                    body: {
                        message: 'Documento criado com sucesso',
                        data: doc,
                        status: true,
                    },
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: {
                        message: error.message,
                        status: false,
                    },
                };
            }
        });
    }
}
exports.CreateDocumentController = CreateDocumentController;
