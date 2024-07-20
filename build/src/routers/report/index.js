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
const express_1 = __importDefault(require("express"));
const report_1 = require("../../controllers/printing/report");
const map_1 = require("../../controllers/printing/map");
const map_products_1 = require("../../controllers/printing/map-products");
const report_new_1 = require("../../controllers/report-new");
const router = express_1.default.Router();
router.get('/:id/:second?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportController = new report_new_1.InvoicePrintController();
    const { id, second } = req.params;
    console.log(req.params);
    const result = yield reportController.handle(id, Boolean(second));
    return res.end(result);
}));
router.get('/termal/printing/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportController = new report_1.ReportController();
    const { id } = req.params;
    const result = yield reportController.defineDocument(id);
    return res.end(result);
}));
router.get('/map/services', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportController = new map_1.MapReportController();
    const { id } = req.params;
    const result = yield reportController.handle(id);
    return res.end(result);
}));
router.get('/map/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportController = new map_products_1.MapProductReportController();
    const { id } = req.params;
    const result = yield reportController.handle(id);
    return res.end(result);
}));
exports.default = router;
