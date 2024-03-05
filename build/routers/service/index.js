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
const mongo_get_services_1 = require("../../repositories/service/get-services/mongo-get-services");
const get_services_1 = require("../../controllers/service/get-services/get-services");
const mongo_create_service_1 = require("../../repositories/service/create-service/mongo-create-service");
const create_service_1 = require("../../controllers/service/create-service/create-service");
const mongo_update_service_1 = require("../../repositories/service/update-service/mongo-update-service");
const update_service_1 = require("../../controllers/service/update-service/update-service");
const router = express_1.default.Router();
router.get('/index/:type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getServicesRepository = new mongo_get_services_1.MongoGetServicesRepository();
    const getServicesController = new get_services_1.GetServicesController(getServicesRepository);
    const { statusCode, body } = yield getServicesController.handle(req.params.type);
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createServiceRepository = new mongo_create_service_1.MongoCreateServiceRepository();
    const createServiceController = new create_service_1.CreateServiceController(createServiceRepository);
    const { body, statusCode } = yield createServiceController.handle({
        body: req.body,
    });
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateServiceRepository = new mongo_update_service_1.MongoUpdateServiceRepository();
    const updateServiceController = new update_service_1.UpdateServiceController(updateServiceRepository);
    const { body, statusCode } = yield updateServiceController.handle({
        body: req.body,
        params: req.params.id,
    });
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pegar um;'ao
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Deletar um;'ao
}));
exports.default = router;
