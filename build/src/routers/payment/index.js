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
const mongo_create_payment_1 = require("../../repositories/payment/create-payment/mongo-create-payment");
const create_payment_1 = require("../../controllers/payment/create-payment/create-payment");
const get_payments_1 = require("../../repositories/payment/get-payments/get-payments");
const get_payments_2 = require("../../controllers/payment/get-payments/get-payments");
const update_payment_1 = require("../../repositories/payment/update-payment/update-payment");
const update_payment_2 = require("../../controllers/payment/update-payment/update-payment");
const mongo_get_payment_1 = require("../../repositories/payment/get-payment/mongo-get-payment");
const get_payment_1 = require("../../controllers/payment/get-payment/get-payment");
const mongo_delete_payment_1 = require("../../repositories/payment/delete-payment/mongo-delete-payment");
const delete_payment_1 = require("../../controllers/payment/delete-payment/delete-payment");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new get_payments_1.MongoGetPaymentsRepository();
    const controller = new get_payments_2.GetPaymentsController(repository);
    const { statusCode, body } = yield controller.handle();
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createPaymentRepository = new mongo_create_payment_1.MongoCreatePaymentRepository();
    const createPaymentController = new create_payment_1.CreatePaymentController(createPaymentRepository);
    const { body, statusCode } = yield createPaymentController.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new update_payment_1.MongoUpdatePaymentRepository();
    const controller = new update_payment_2.UpdatePaymentController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id, req.body);
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_payment_1.MongoGetPayment();
    const controller = new get_payment_1.GetPaymentController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_delete_payment_1.MongoDeletePayment();
    const controller = new delete_payment_1.DeletePaymentController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
