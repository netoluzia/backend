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
const express_1 = __importDefault(require("express"));
const material_new_1 = require("../../repositories/material-new");
const material_new_2 = require("../../controllers/material-new");
const router = express_1.default.Router();
router.get('/index/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const orderBy = req.query.orderBy || { createdAt: 'desc' };
    const repository = new material_new_1.ExpendableMaterialRepository();
    const controller = new material_new_2.ExpendableMaterialController(repository);
    const _a = yield controller.index({
        search,
        page,
        perPage,
        orderBy,
        category: req.params.category,
    }), { status } = _a, rest = __rest(_a, ["status"]);
    return res.status(status).send(rest);
}));
router.get('/filter/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || '';
    const repository = new material_new_1.ExpendableMaterialRepository();
    const controller = new material_new_2.ExpendableMaterialController(repository);
    const _b = yield controller.searchByName(search), { status } = _b, rest = __rest(_b, ["status"]);
    return res.status(status).send(rest);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repository = new material_new_1.ExpendableMaterialRepository();
    const controller = new material_new_2.ExpendableMaterialController(repository);
    const _c = yield controller.show(id), { status } = _c, rest = __rest(_c, ["status"]);
    return res.status(status).send(rest);
}));
router.delete('/destroy/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repository = new material_new_1.ExpendableMaterialRepository();
    const controller = new material_new_2.ExpendableMaterialController(repository);
    const _d = yield controller.destroy(id), { status } = _d, rest = __rest(_d, ["status"]);
    return res.status(status).send(rest);
}));
router.patch('/soft-delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repository = new material_new_1.ExpendableMaterialRepository();
    const controller = new material_new_2.ExpendableMaterialController(repository);
    const _e = yield controller.softDelete(id), { status } = _e, rest = __rest(_e, ["status"]);
    return res.status(status).send(rest);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const repository = new material_new_1.ExpendableMaterialRepository();
    const controller = new material_new_2.ExpendableMaterialController(repository);
    const _f = yield controller.create(body), { status } = _f, rest = __rest(_f, ["status"]);
    return res.status(status).send(rest);
}));
exports.default = router;
