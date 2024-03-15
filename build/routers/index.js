"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../middlewares/token");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const service_1 = __importDefault(require("./service"));
const report_1 = __importDefault(require("./report"));
const document_1 = __importDefault(require("./document"));
const client_1 = __importDefault(require("./client"));
const payment_1 = __importDefault(require("./payment"));
const insurance_1 = __importDefault(require("./insurance"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
const middleware = new token_1.Middlewares();
// testando
router.use('/users', middleware.verifyToken, user_1.default);
router.use('/services', middleware.verifyToken, service_1.default);
router.use('/reports', report_1.default);
router.use('/documents', middleware.verifyToken, document_1.default);
router.use('/clients', middleware.verifyToken, client_1.default);
router.use('/payments', middleware.verifyToken, payment_1.default);
router.use('/insurances', middleware.verifyToken, insurance_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
