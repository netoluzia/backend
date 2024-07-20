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
const mongo_get_protocols_1 = require("../../repositories/protocol/get-protocols/mongo-get-protocols");
const get_protocols_1 = require("../../controllers/protocols/get-protocols/get-protocols");
const mongo_create_protocol_1 = require("../../repositories/protocol/create-protocol/mongo-create-protocol");
const create_protocol_1 = require("../../controllers/protocols/create-protocol/create-protocol");
const mongo_get_protocol_1 = require("../../repositories/protocol/get-protocol/mongo-get-protocol");
const get_protocol_1 = require("../../controllers/protocols/get-protocol/get-protocol");
const mongo_update_protocol_1 = require("../../repositories/protocol/update-protocol/mongo-update-protocol");
const update_protocol_1 = require("../../controllers/protocols/update-protocol/update-protocol");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_protocols_1.MongoGetProtocolsRepository();
    const controller = new get_protocols_1.GetProtocols(repository);
    const { body, statusCode } = yield controller.handle();
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_protocol_1.MongoGetProtocolRepository();
    const controller = new get_protocol_1.GetProtocol(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_create_protocol_1.MongoCreateProtocol();
    const controller = new create_protocol_1.CreateProtocolController(repository);
    const { body, statusCode } = yield controller.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_update_protocol_1.MongoUpdateProtocolRepository();
    const controller = new update_protocol_1.UpdateProtocolController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id, req.body);
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const repository = new MongoDeleteInsuranceRepository()
    //   const controller = new DeleteInsuranceController(repository)
    //   const { body, statusCode } = await controller.handle(req.params.id)
    //   return res.status(statusCode).send(body)
}));
exports.default = router;
