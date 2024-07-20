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
const mongo_get_service_1 = require("../../repositories/service/get-service/mongo-get-service");
const get_service_1 = require("../../controllers/service/get-service/get-service");
const mongo_delete_service_1 = require("../../repositories/service/delete-service/mongo-delete-service");
const delete_service_1 = require("../../controllers/service/delete-service/delete-service");
const mongo_attach_material_1 = require("../../repositories/service/attach-material/mongo-attach-material");
const attach_material_1 = require("../../controllers/service/attach-material/attach-material");
const mongo_get_material_form_service_1 = require("../../repositories/service/get-material-from-service/mongo-get-material-form-service");
const get_material_from_service_1 = require("../../controllers/service/get-material-from-service/get-material-from-service");
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
router.patch('/attach-material/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createServiceRepository = new mongo_attach_material_1.MongoAttachMaterialRepository();
    const createServiceController = new attach_material_1.AttachMaterialController(createServiceRepository);
    const { body, statusCode } = yield createServiceController.handle({
        body: req.body.material,
        params: req.params,
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
    const repository = new mongo_get_service_1.MongoGetServiceRepository();
    const controller = new get_service_1.GetServiceController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.get('/materials/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_material_form_service_1.MongoGetMaterialFormServiceRepository();
    const controller = new get_material_from_service_1.GetMaterialFromService(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_delete_service_1.MongoDeleteServiceRepository();
    const controller = new delete_service_1.DeleteServiceController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
