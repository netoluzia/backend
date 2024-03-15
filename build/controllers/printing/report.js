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
exports.ReportController = void 0;
const pdfmake_1 = __importDefault(require("pdfmake"));
const mongo_get_document_1 = require("../../repositories/document/get-document/mongo-get-document");
const documents = {
    FT: 'Fatura',
    RG: 'Recibo',
    FR: 'Fatura-Recibo',
};
class ReportController {
    handle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const repository = new mongo_get_document_1.MongoGetDocumentRepository();
                const data = yield repository.getDocument(id);
                const documentData = JSON.parse(JSON.stringify(data));
                const client = documentData.client;
                console.log(documentData);
                const fonts = {
                    Helvetica: {
                        normal: 'Helvetica',
                        bold: 'Helvetica-Bold',
                        italics: 'Helvetica-Oblique',
                        bolditalics: 'Helvetica-BoldOblique',
                    },
                };
                let itemsTable = [];
                documentData.items.forEach((item) => {
                    const element = [
                        { style: 'default', text: item.item, alignment: 'left' },
                        { style: 'default', text: item.quantity, alignment: 'center' },
                        {
                            style: 'default',
                            text: new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'AOA',
                            }).format(item.total),
                            alignment: 'right',
                        },
                    ];
                    itemsTable.push(element);
                });
                itemsTable.push([
                    { style: 'default', text: 'TOTAL', alignment: 'left' },
                    {},
                    {
                        style: 'default',
                        text: new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: 'AOA',
                        }).format(documentData.total),
                        alignment: 'right',
                    },
                ]);
                const printer = new pdfmake_1.default(fonts);
                let docDefinition = {
                    content: [
                        {
                            columns: [
                                {
                                    width: '50%',
                                    style: ['default'],
                                    columns: [
                                        [
                                            {
                                                text: 'Clínica Alfavida',
                                                style: ['header'],
                                            },
                                            'Endereço: Zango 1, Rua da Pomobel',
                                            'Telefone: (+244) 946 803 775 / 990 803 775',
                                            'Email: clinicaalfavida2020@gmail.com',
                                            'Número de contribuinte: 5000139777',
                                        ],
                                    ],
                                },
                                {
                                    width: '50%',
                                    style: ['default'],
                                    columns: [
                                        [
                                            {
                                                text: documents[documentData.document],
                                                alignment: 'right',
                                                style: ['header'],
                                            },
                                            {
                                                text: `Referência: ${documentData.document}/${documentData === null || documentData === void 0 ? void 0 : documentData.reference}`,
                                                alignment: 'right',
                                            },
                                            {
                                                text: 'Data de emissão: ' +
                                                    new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    }).format(new Date(documentData === null || documentData === void 0 ? void 0 : documentData.emission_date)),
                                                alignment: 'right',
                                            },
                                            {
                                                text: 'Série: 2024',
                                                alignment: 'right',
                                            },
                                        ],
                                    ],
                                },
                            ],
                            // optional space between columns
                            columnGap: 10,
                        },
                        {
                            columns: [
                                {
                                    width: '50%',
                                    marginTop: 15,
                                    table: {
                                        widths: ['30%', '70%'],
                                        headerRows: 1,
                                        body: [
                                            [
                                                {
                                                    text: 'Segurado',
                                                    style: 'tableHeader',
                                                    colSpan: 2,
                                                    alignment: 'center',
                                                },
                                                {},
                                            ],
                                            [
                                                {
                                                    text: 'Nome',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.name,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Cartão',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.insurance_number,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Contribuinte',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client === null || client === void 0 ? void 0 : client.nif,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Telefone',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.phone_number,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                        ],
                                    },
                                },
                                {
                                    width: '50%',
                                    marginTop: 15,
                                    table: {
                                        widths: ['30%', '70%'],
                                        headerRows: 1,
                                        body: [
                                            [
                                                {
                                                    text: 'Seguradora',
                                                    style: 'tableHeader',
                                                    colSpan: 2,
                                                    alignment: 'center',
                                                },
                                                {},
                                            ],
                                            [
                                                {
                                                    text: 'Nome',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.insurance_company[0].name,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Endereço',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.insurance_company[0].address,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Contribuinte',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.insurance_company[0].nif,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Telefone',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: client.insurance_company[0].phone_number,
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                        ],
                                    },
                                },
                            ],
                            columnGap: 10,
                        },
                        {
                            columns: [
                                {
                                    width: '50%',
                                    marginTop: 15,
                                    table: {
                                        widths: ['50%', '50%'],
                                        headerRows: 1,
                                        body: [
                                            [
                                                {
                                                    text: 'Data e hora de entrada',
                                                    style: 'tableHeader',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: 'Data e hora de alta',
                                                    style: 'tableHeader',
                                                    alignment: 'left',
                                                },
                                            ],
                                            [
                                                {
                                                    text: '02/03/2024 - 08:34:45',
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: '02/03/2024 - 13:44:45',
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                        ],
                                    },
                                },
                                {
                                    width: '50%',
                                    marginTop: 15,
                                    table: {
                                        widths: ['100%'],
                                        headerRows: 1,
                                        body: [
                                            [
                                                {
                                                    text: 'Elegibilidade | Termo de responsabilidade',
                                                    style: 'tableHeader',
                                                    alignment: 'center',
                                                },
                                            ],
                                            [
                                                {
                                                    text: ' ',
                                                    style: ['bodyStyle'],
                                                },
                                            ],
                                        ],
                                    },
                                },
                            ],
                            columnGap: 10,
                        },
                        {
                            marginTop: 25,
                            table: {
                                widths: ['50%', '15%', '35%'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: 'Serviço',
                                            style: 'tableHeader',
                                            alignment: 'left',
                                        },
                                        {
                                            text: 'Quantidade',
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
                            layout: 'headerLineOnly',
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
                                    text: 'funcionario',
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
exports.ReportController = ReportController;
