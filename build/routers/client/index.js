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
const mongo_get_clients_1 = require("../../repositories/client/get-clients/mongo-get-clients");
const get_clients_1 = require("../../controllers/client/get-clients/get-clients");
const mongo_create_client_1 = require("../../repositories/client/create-client/mongo-create-client");
const create_client_1 = require("../../controllers/client/create-client/create-client");
const mongo_update_client_1 = require("../../repositories/client/update-client/mongo-update-client");
const update_client_1 = require("../../controllers/client/update-client/update-client");
const get_client_1 = require("../../controllers/client/get-client/get-client");
const mongo_get_client_1 = require("../../repositories/client/get-client/mongo-get-client");
const mongo_delete_client_1 = require("../../repositories/client/delete-client/mongo-delete-client");
const delete_client_1 = require("../../controllers/client/delete-client/delete-client");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getClientsRepository = new mongo_get_clients_1.MongoGetClientsRepository();
    const getClientsController = new get_clients_1.GetClientsController(getClientsRepository);
    const { body, statusCode } = yield getClientsController.handle();
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createClientRepository = new mongo_create_client_1.MongoCreateClientRepository();
    const createClientController = new create_client_1.CreateClientController(createClientRepository);
    const { body, statusCode } = yield createClientController.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateClientRepository = new mongo_update_client_1.MongoUpdateClientRepository();
    const updateClientController = new update_client_1.UpdateClientController(updateClientRepository);
    const { statusCode, body } = yield updateClientController.handle(req.params.id, req.body);
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pegar um;'ao
    const repository = new mongo_get_client_1.MongoGetClientRepository();
    const controller = new get_client_1.GetClientController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Deletar um;'ao
    const repository = new mongo_delete_client_1.MongoDeleteClientRepository();
    const controller = new delete_client_1.DeleteClientController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
