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
const mongo_get_products_1 = require("../../repositories/product/get-products/mongo-get-products");
const get_products_1 = require("../../controllers/product/get-products/get-products");
const mongo_get_product_1 = require("../../repositories/product/get-product/mongo-get-product");
const get_product_1 = require("../../controllers/product/get-product/get-product");
const mongo_create_product_1 = require("../../repositories/product/create-product/mongo-create-product");
const create_product_1 = require("../../controllers/product/create-product/create-product");
const mongo_update_product_1 = require("../../repositories/product/update-product/mongo-update-product");
const update_product_1 = require("../../controllers/product/update-product/update-product");
const mongo_delete_product_1 = require("../../repositories/product/delete-product/mongo-delete-product");
const delete_product_1 = require("../../controllers/product/delete-product/delete-product");
const router = express_1.default.Router();
router.get('/index/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_products_1.MongoGetProductsRepository();
    const controller = new get_products_1.GetProductsController(repository);
    const { body, statusCode } = yield controller.handle(req.params.category);
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_product_1.MongoGetProductRepository();
    const controller = new get_product_1.GetProductController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_create_product_1.MongoCreateProductRepository();
    const controller = new create_product_1.CreateProductController(repository);
    const { body, statusCode } = yield controller.handle({ body: req.body });
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_update_product_1.MongoUpdateProductRepository();
    const controller = new update_product_1.UpdateProductController(repository);
    const { body, statusCode } = yield controller.handle({
        body: req.body,
        params: req.params.id,
    });
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_delete_product_1.MongoDeleteProductRepository();
    const controller = new delete_product_1.DeleteProductController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
