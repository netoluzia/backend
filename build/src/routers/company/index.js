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
const mongo_get_company_1 = require("../../repositories/company/get-company/mongo-get-company");
const get_company_1 = require("../../controllers/company/get-company/get-company");
const mongo_create_company_1 = require("../../repositories/company/create-company/mongo-create-company");
const mongo_update_company_1 = require("../../repositories/company/update-company/mongo-update-company");
const create_company_1 = require("../../controllers/company/create-company/create-company");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_get_company_1.MongoGetCompany();
    const controller = new get_company_1.GetCompanyController(repository);
    const { body, statusCode } = yield controller.handle();
    return res.status(statusCode).send(body);
}));
router.post('/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repositoryCreate = new mongo_create_company_1.MongoCreateCompany();
    const repositoryUpdate = new mongo_update_company_1.MongoUpdateCompany();
    const controller = new create_company_1.CreateCompanyControler(repositoryCreate, repositoryUpdate);
    const { body, statusCode } = yield controller.handle(req.body, req.params.id);
    return res.status(statusCode).send(body);
}));
exports.default = router;
