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
exports.MapProductReportController = void 0;
const pdfmake_1 = __importDefault(require("pdfmake"));
const mongo_get_company_1 = require("../../repositories/company/get-company/mongo-get-company");
const mongo_1 = require("../../database/mongo");
class MapProductReportController {
    handle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const companyRepository = new mongo_get_company_1.MongoGetCompany();
                const company = yield companyRepository.getCompany();
                const products = yield mongo_1.MongoClient.db
                    .collection('product')
                    .find({})
                    .sort({ category: -1 })
                    .toArray();
                let itemsTable = [];
                products.forEach((item) => {
                    const element = [
                        { style: 'default', text: item.title, alignment: 'left' },
                        { style: 'default', text: item.description, alignment: 'left' },
                        { style: 'default', text: item.category, alignment: 'center' },
                        {
                            style: 'default',
                            text: new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'AOA',
                            }).format(Number(item.net_price)),
                            alignment: 'right',
                        },
                    ];
                    itemsTable.push(element);
                });
                const fonts = {
                    Helvetica: {
                        normal: 'Helvetica',
                        bold: 'Helvetica-Bold',
                        italics: 'Helvetica-Oblique',
                        bolditalics: 'Helvetica-BoldOblique',
                    },
                };
                const companyData = [
                    {
                        text: company.name,
                        style: ['header'],
                    },
                    `Endereço: ${company.address}`,
                    `Telefone: (+244) ${company.phone_number}`,
                    `Email: ${company.email}`,
                    `Número de contribuinte: ${company.nif}`,
                ];
                const printer = new pdfmake_1.default(fonts);
                let docDefinition = {
                    content: [
                        {
                            columns: [
                                {
                                    width: '100%',
                                    style: ['default'],
                                    columns: [companyData],
                                },
                            ],
                            // optional space between columns
                            columnGap: 10,
                        },
                        {
                            text: 'Lista de produtos',
                            style: {
                                fontSize: 14,
                                alignment: 'center',
                            },
                        },
                        {
                            marginTop: 10,
                            table: {
                                widths: ['30%', '40%', '15%', '15%'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: 'Serviço',
                                            style: 'tableHeader',
                                            alignment: 'left',
                                        },
                                        {
                                            text: 'Descrição',
                                            style: 'tableHeader',
                                            alignment: 'left',
                                        },
                                        {
                                            text: 'Categoria',
                                            style: 'tableHeader',
                                            alignment: 'center',
                                        },
                                        {
                                            text: 'Preço',
                                            style: 'tableHeader',
                                            alignment: 'right',
                                        },
                                    ],
                                    ...itemsTable,
                                ],
                            },
                            layout: 'lightHorizontalLines',
                        },
                    ],
                    footer: {
                        style: {
                            fontSize: 9,
                        },
                        marginLeft: 36,
                        marginRight: 36,
                        columns: [
                            [
                                {
                                    text: 'programa certificado e validado pela AGT',
                                    alignment: 'center',
                                },
                                {
                                    text: `Atendido por:`,
                                    alignment: 'center',
                                },
                            ],
                        ],
                    },
                    defaultStyle: {
                        font: 'Helvetica',
                    },
                    styles: {
                        header: {
                            fontSize: 16,
                        },
                        default: {
                            lineHeight: 1.3,
                            fontSize: 9,
                        },
                        anotherStyle: {
                            italics: true,
                            alignment: 'right',
                        },
                        tableHeader: {
                            fillColor: '#06063f',
                            color: 'white',
                            fontSize: 10,
                        },
                        bodyStyle: {
                            alignment: 'left',
                            fontSize: 10,
                            lineHeight: 1,
                        },
                    },
                };
                const pdfDoc = printer.createPdfKitDocument(docDefinition);
                const chunks = [];
                pdfDoc.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                pdfDoc.end();
                pdfDoc.on('end', () => {
                    const result = Buffer.concat(chunks);
                    resolve(result);
                });
                pdfDoc.on('error', (error) => {
                    reject(error);
                });
            }));
        });
    }
}
exports.MapProductReportController = MapProductReportController;
