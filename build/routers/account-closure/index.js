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
const mongo_get_account_closures_1 = require("../../repositories/account-closure/get-account-closures/mongo-get-account-closures");
const get_account_closures_1 = require("../../controllers/account-closure/get-account-closures/get-account-closures");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getClientsRepository = new mongo_get_account_closures_1.MongoGetAccountClosuresRepository();
    const getClientsController = new get_account_closures_1.GetAccountClosuresController(getClientsRepository);
    console.log(req.body);
    const { body, statusCode } = yield getClientsController.handle(req.body);
    return res.status(statusCode).send(body);
}));
// router.post('/', async (req: Request, res: Response) => {
//   const createClientRepository = new MongoCreateClientRepository()
//   const createClientController = new CreateClientController(
//     createClientRepository
//   )
//   const { body, statusCode } = await createClientController.handle(req.body)
//   return res.status(statusCode).send(body)
// })
// router.patch('/:id', async (req: Request, res: Response) => {
//   const updateClientRepository = new MongoUpdateClientRepository()
//   const updateClientController = new UpdateClientController(
//     updateClientRepository
//   )
//   const { statusCode, body } = await updateClientController.handle(
//     req.params.id,
//     req.body
//   )
//   return res.status(statusCode).send(body)
// })
// router.get('/:id', async (req: Request, res: Response) => {
//   // Pegar um;'ao
//   const repository = new MongoGetClientRepository()
//   const controller = new GetClientController(repository)
//   const { body, statusCode } = await controller.handle(req.params.id)
//   return res.status(statusCode).send(body)
// })
// router.delete('/:id', async (req: Request, res: Response) => {
//   // Deletar um;'ao
//   const repository = new MongoDeleteClientRepository()
//   const controller = new DeleteClientController(repository)
//   const { body, statusCode } = await controller.handle(req.params.id)
//   return res.status(statusCode).send(body)
// })
exports.default = router;
