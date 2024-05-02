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
const report_per_month_1 = require("../../controllers/dashboard/report-per-month/report-per-month");
const report_per_month_2 = require("../../repositories/dashboard/report-per-month/report-per-month");
const router = express_1.default.Router();
router.get('/per-month', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new report_per_month_2.MongoGetReportPerMonth();
    const controller = new report_per_month_1.ReportPerMonthController(repository);
    const { body, statusCode } = yield controller.handle();
    return res.status(statusCode).send(body);
}));
exports.default = router;
