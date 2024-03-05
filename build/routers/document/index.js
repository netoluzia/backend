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
const mongo_get_documents_1 = require("../../repositories/document/get-documents/mongo-get-documents");
const get_documents_1 = require("../../controllers/document/get-documents/get-documents");
const mongo_create_document_1 = require("../../repositories/document/create-document/mongo-create-document");
const create_document_1 = require("../../controllers/document/create-document/create-document");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getDocumentsRepository = new mongo_get_documents_1.MongoGetDocumentsRepository();
    const getDocumentsController = new get_documents_1.GetDocumentsController(getDocumentsRepository);
    const { body, statusCode } = yield getDocumentsController.handle();
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_create_document_1.MongoCreateDocumentRepository();
    const controller = new create_document_1.CreateDocumentController(repository);
    const { body, statusCode } = yield controller.handle(req.body);
    return res.status(statusCode).send(body);
}));
exports.default = router;
