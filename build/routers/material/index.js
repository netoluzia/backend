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
const mongo_get_materials_1 = require("../../repositories/materials/get-materials/mongo-get-materials");
const get_materials_1 = require("../../controllers/materials/get-materials/get-materials");
const mongo_get_material_1 = require("../../repositories/materials/get-material/mongo-get-material");
const get_material_1 = require("../../controllers/materials/get-material/get-material");
const mongo_create_materials_1 = require("../../repositories/materials/create-materials/mongo-create-materials");
const create_materials_1 = require("../../controllers/materials/create-materials/create-materials");
const mongo_update_material_1 = require("../../repositories/materials/update-materials/mongo-update-material");
const update_ensurance_1 = require("../../controllers/materials/update-materials/update-ensurance");
const mongo_delete_material_1 = require("../../repositories/materials/delete-material/mongo-delete-material");
const delete_material_1 = require("../../controllers/materials/delete-material/delete-material");
const mongo_search_material_1 = require("../../repositories/materials/search-material/mongo-search-material");
const search_material_1 = require("../../controllers/materials/search-material/search-material");
const mongo_add_stock_1 = require("../../repositories/materials/add-stock/mongo-add-stock");
const add_stock_1 = require("../../controllers/materials/add-stock/add-stock");
const mongo_get_logs_1 = require("../../repositories/materials/get-logs/mongo-get-logs");
const stock_logs_1 = require("../../controllers/materials/stock-logs/stock-logs");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_materials_1.MongoGetStockMaterialsRepository();
    const controller = new get_materials_1.GetStockMaterialsController(repository);
    const { body, statusCode } = yield controller.handle();
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_material_1.MongoGetStockMaterialRepository();
    const controller = new get_material_1.GetStockMaterialController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.post('/stock-logs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_logs_1.MongoGetLogsRepository();
    const controller = new stock_logs_1.StockLogsController(repository);
    const { body, statusCode } = yield controller.handle(req.body.month);
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_create_materials_1.MongoCreateStockMaterialRepository();
    const controller = new create_materials_1.CreateStockMaterialController(repository);
    const { body, statusCode } = yield controller.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_search_material_1.MongoSearchStockMaterial();
    const controller = new search_material_1.SearchStockMaterial(repository);
    const { body, statusCode } = yield controller.handle(req.body.search);
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_update_material_1.MongoUpdateStockMaterialRepository();
    const controller = new update_ensurance_1.UpdateStockMaterialController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id, req.body);
    return res.status(statusCode).send(body);
}));
router.patch('/add-stock/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_add_stock_1.MongoAddStockRepository();
    const controller = new add_stock_1.AddStockController(repository);
    const { body, statusCode } = yield controller.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_delete_material_1.MongoDeleteStockMaterialRepository();
    const controller = new delete_material_1.DeleteStockMaterialController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
