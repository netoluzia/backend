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
const mongo_create_attending_1 = require("../../repositories/attending/create-attending/mongo-create-attending");
const create_attending_1 = require("../../controllers/attending/create-attending/create-attending");
const mongo_update_attending_1 = require("../../repositories/attending/update-attending/mongo-update-attending");
const update_attending_1 = require("../../controllers/attending/update-attending/update-attending");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { body, statusCode } = await getClientsController.handle()
    //   return res.status(statusCode).send(body)
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_create_attending_1.MongoCreateAttendingRepository();
    const controller = new create_attending_1.CreateAttendingController(repository);
    const { body, statusCode } = yield controller.handle(req.body);
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mongo_update_attending_1.MongoUpdateAttendingRepository();
    const controller = new update_attending_1.UpdateAttendingController(repository);
    const { body, statusCode } = yield controller.handle(req.params.id, req.body);
    return res.status(statusCode).send(body);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pegar um;'ao
    //   const { body, statusCode } = await controller.handle(req.params.id)
    //   return res.status(statusCode).send(body)
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Deletar um;'ao
    //   const { body, statusCode } = await controller.handle(req.params.id)
    //   return res.status(statusCode).send(body)
}));
exports.default = router;
