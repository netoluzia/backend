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
const mongo_get_insurances_1 = require("../../repositories/ensurance/get-insurances/mongo-get-insurances");
const get_ensurances_1 = require("../../controllers/ensurance/get-ensurances/get-ensurances");
const mongo_create_insurance_1 = require("../../repositories/ensurance/create-insurance/mongo-create-insurance");
const create_ensurance_1 = require("../../controllers/ensurance/create-ensurance/create-ensurance");
const mongo_get_insurance_1 = require("../../repositories/ensurance/get-insurance/mongo-get-insurance");
const get_insurance_1 = require("../../controllers/ensurance/get-ensurance/get-insurance");
const mongo_update_insurance_1 = require("../../repositories/ensurance/update-insurance/mongo-update-insurance");
const update_ensurance_1 = require("../../controllers/ensurance/update-ensurance/update-ensurance");
const mongo_delete_insurance_1 = require("../../repositories/ensurance/delete-insurance/mongo-delete-insurance");
const delete_ensurance_1 = require("../../controllers/ensurance/delete-ensurance/delete-ensurance");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_insurances_1.MongoGetInsurancesRepository();
    const controller = new get_ensurances_1.GetInsurancesController(repository);
    const { body, statusCode } = yield controller.handle();
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_insurance_1.MongoGetInsuranceRepository();
    const controller = new get_insurance_1.GetInsuranceController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_create_insurance_1.MongoCreateInsuranceRepository();
    const controller = new create_ensurance_1.CreateInsuranceController(repository);
    const { body, statusCode } = yield controller.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_update_insurance_1.MongoUpdateInsuranceRepository();
    const controller = new update_ensurance_1.UpdateInsuranceController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id, req.body);
    return res.status(statusCode).send(body);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_delete_insurance_1.MongoDeleteInsuranceRepository();
    const controller = new delete_ensurance_1.DeleteInsuranceController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
