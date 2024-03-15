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
const mongo_get_users_1 = require("../../repositories/user/get-users/mongo-get-users");
const get_users_1 = require("../../controllers/user/get-users/get-users");
const mongo_create_user_1 = require("../../repositories/user/create-user/mongo-create-user");
const create_user_1 = require("../../controllers/user/create-user/create-user");
const mongo_get_user_1 = require("../../repositories/user/get-user/mongo-get-user");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUsersRepository = new mongo_get_users_1.MongoGetUsersRepository();
    const getUserController = new get_users_1.GetUserController(getUsersRepository);
    const { body, statusCode } = yield getUserController.handle();
    return res.status(statusCode).send(body);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserRepository = new mongo_create_user_1.MongoCreateUserRepository();
    const getUserRepository = new mongo_get_user_1.MongoGetUserRepository();
    const createUserController = new create_user_1.CreateUserController(createUserRepository, getUserRepository);
    const { body, statusCode } = yield createUserController.handle({
        body: req.body,
    });
    return res.status(statusCode).send(body);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Atualiza;'ao
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pegar um;'ao
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Deletar um;'ao
}));
exports.default = router;
