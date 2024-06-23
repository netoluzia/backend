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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
const mongo_get_material_form_service_1 = require("../../../repositories/service/get-material-from-service/mongo-get-material-form-service");
const mongo_add_stock_1 = require("../../../repositories/materials/add-stock/mongo-add-stock");
class CreateDocumentController {
    constructor(createDocumentRepository, countDocumentType) {
        this.createDocumentRepository = createDocumentRepository;
        this.countDocumentType = countDocumentType;
    }
    calculateTotal(items) {
        return items.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.total;
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
    decrementStock(items) {
        var _a, items_1, items_1_1;
        var _b, e_1, _c, _d, _e, e_2, _f, _g, _h, e_3, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const identifiers = [];
                const repository = new mongo_get_material_form_service_1.MongoGetMaterialFormServiceRepository();
                try {
                    for (_a = true, items_1 = __asyncValues(items); items_1_1 = yield items_1.next(), _b = items_1_1.done, !_b; _a = true) {
                        _d = items_1_1.value;
                        _a = false;
                        const item = _d;
                        console.log(item);
                        const service = yield repository.getMaterialFromService(item.id.toHexString());
                        if (!service)
                            return true;
                        try {
                            for (var _l = true, _m = (e_2 = void 0, __asyncValues(service.materials)), _o; _o = yield _m.next(), _e = _o.done, !_e; _l = true) {
                                _g = _o.value;
                                _l = false;
                                const iterator = _g;
                                const rest = iterator.materialDetails.quantity - iterator.quantity;
                                if (rest < 0)
                                    return false;
                                identifiers.push({
                                    material: iterator.materialId,
                                    qtd: iterator.quantity,
                                });
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (!_l && !_e && (_f = _m.return)) yield _f.call(_m);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_a && !_b && (_c = items_1.return)) yield _c.call(items_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                const anotherRepository = new mongo_add_stock_1.MongoAddStockRepository();
                try {
                    for (var _p = true, identifiers_1 = __asyncValues(identifiers), identifiers_1_1; identifiers_1_1 = yield identifiers_1.next(), _h = identifiers_1_1.done, !_h; _p = true) {
                        _k = identifiers_1_1.value;
                        _p = false;
                        const iterator = _k;
                        // await anotherRepository.addStock(iterator.material, -1 * iterator.qtd)
                        yield anotherRepository.addStock({
                            material: iterator.material,
                            quantity: iterator.qtd,
                            type: 'SAIDA',
                        });
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (!_p && !_h && (_j = identifiers_1.return)) yield _j.call(identifiers_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { items, client, payment, document, amount_received, paid, source, attendant, } = params;
                const auxItems = items.map((_a) => {
                    var { total, quantity, unit_price, id } = _a, rest = __rest(_a, ["total", "quantity", "unit_price", "id"]);
                    return (Object.assign({ total: quantity * total, quantity,
                        unit_price, id: new mongodb_1.ObjectId(id) }, rest));
                });
                paid = false;
                const total = this.calculateTotal(items);
                const reference = yield this.generateReference(document);
                let change = null;
                if (document == 'RC' || document == 'FR') {
                    change = amount_received - total;
                    paid = true;
                    const response = yield this.decrementStock(auxItems);
                    console.log(response);
                    if (!response)
                        throw new Error('Materiais em falta no stock');
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
                    reference, serie: new Date().getFullYear(), createdAt: new Date(), emission_date: new Date(), client: new mongodb_1.ObjectId(client), payment: payment ? new mongodb_1.ObjectId(payment) : null, items: auxItems, amount_received, change: change, hash4,
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
