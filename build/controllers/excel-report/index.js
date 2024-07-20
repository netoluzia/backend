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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelReport = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../../database/prisma");
class ExcelReport {
    getMonthRange(year, month) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        return { start, end };
    }
    addSheetData(sheet, data) {
        sheet.columns = [
            { header: 'NIF', key: 'nif', width: 18 },
            { header: 'Nome Comercial', key: 'name', width: 30 },
            { header: 'Ref..', key: 'reference', width: 20 },
            {
                header: 'N° eligibilidade \nTermo de responsabilidade',
                key: 'terms',
                width: 40,
            },
            { header: 'Data de Ocorrência', key: 'emission_date', width: 20 },
            { header: 'Nome do Paciente', key: 'customer_name', width: 30 },
            { header: 'Nº do cartão de seguro', key: 'insurance_number', width: 30 },
            { header: 'Total 100% \n (ADV-Angola)', key: 'total', width: 35 },
            { header: 'Co-pagamento', key: 'discount', width: 20 },
            {
                header: 'Valor a pagar \n pela ADV-Angola',
                key: 'total_adv',
                width: 35,
            },
        ];
        data.forEach((row) => {
            sheet.addRow(row);
        });
        // Estiliza o cabeçalho
        sheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFA500' }, // Cor laranja
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
    }
    handle(month, year) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { start, end } = this.getMonthRange(month, year);
            const workbook = new exceljs_1.default.Workbook();
            const insurances = yield prisma_1.prisma.insurance.findMany({
                select: { id: true, name: true, nif: true },
            });
            const data = [];
            try {
                for (var _d = true, insurances_1 = __asyncValues(insurances), insurances_1_1; insurances_1_1 = yield insurances_1.next(), _a = insurances_1_1.done, !_a; _d = true) {
                    _c = insurances_1_1.value;
                    _d = false;
                    const iterator = _c;
                    let row = {};
                    const invoices = yield prisma_1.prisma.invoice.findMany({
                        where: {
                            emission_date: {
                                gte: start,
                                lte: end,
                            },
                            customer: {
                                insuranceId: iterator.id,
                            },
                            status: 'POR_PAGAR',
                        },
                        select: {
                            reference: true,
                            emission_date: true,
                            customer: true,
                            discount: true,
                            total: true,
                        },
                    });
                    invoices.forEach((invoice) => {
                        var _a, _b;
                        row = {
                            nif: iterator.nif,
                            name: iterator.name,
                            reference: invoice.reference,
                            emission_date: invoice.emission_date,
                            customer_name: (_a = invoice.customer) === null || _a === void 0 ? void 0 : _a.name,
                            insurance_number: (_b = invoice.customer) === null || _b === void 0 ? void 0 : _b.insurance_number,
                            total: `${new Intl.NumberFormat('de-DE', {
                                currency: 'AOA',
                                style: 'currency',
                            })
                                .format(Number(invoice.total) + Number(invoice.discount))
                                .slice(0, -3)}`,
                            total_adv: `${new Intl.NumberFormat('de-DE', {
                                currency: 'AOA',
                                style: 'currency',
                            })
                                .format(Number(invoice.total))
                                .slice(0, -3)}`,
                            discount: `${new Intl.NumberFormat('de-DE', {
                                currency: 'AOA',
                                style: 'currency',
                            })
                                .format(Number(invoice.discount))
                                .slice(0, -3)}`,
                            terms: '',
                        };
                        data.push(row);
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = insurances_1.return)) yield _b.call(insurances_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            insurances.forEach((insurance) => {
                const sheet = workbook.addWorksheet(insurance.name.slice(0, 9));
                this.addSheetData(sheet, data.filter((item) => item.name == insurance.name));
            });
            const filePath = path_1.default.join(__dirname, 'relatorio.xlsx');
            yield workbook.xlsx.writeFile(filePath);
            return filePath;
        });
    }
}
exports.ExcelReport = ExcelReport;
