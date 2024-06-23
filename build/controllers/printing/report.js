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
const mongo_get_company_1 = require("../../repositories/company/get-company/mongo-get-company");
const mongo_get_user_1 = require("../../repositories/user/get-user/mongo-get-user");
const mongo_get_payment_1 = require("../../repositories/payment/get-payment/mongo-get-payment");
const documents = {
    FT: 'Fatura',
    RC: 'Recibo',
    FR: 'Fatura-Recibo',
};
class ReportController {
    handle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const repository = new mongo_get_document_1.MongoGetDocumentRepository();
                const data = yield repository.getDocument(id);
                const documentData = JSON.parse(JSON.stringify(data));
                const client = documentData.client;
                const companyRepository = new mongo_get_company_1.MongoGetCompany();
                const company = yield companyRepository.getCompany();
                const userGet = new mongo_get_user_1.MongoGetUserRepository();
                const paymentGet = new mongo_get_payment_1.MongoGetPayment();
                const payment = yield paymentGet.getPayment(documentData.payment);
                const user = yield userGet.getUser({
                    id: data.attendant,
                });
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
                        { style: 'default', text: item.description, alignment: 'left' },
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
                    { style: 'tableHeader', text: 'TOTAL', alignment: 'left' },
                    { style: 'tableHeader', text: '' },
                    { style: 'tableHeader', text: '' },
                    {
                        style: 'tableHeader',
                        text: new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: 'AOA',
                        }).format(documentData.total),
                        alignment: 'right',
                    },
                ]);
                if (documentData.document == 'FR' || 'RC') {
                    itemsTable.push([
                        {
                            style: 'tableHeader',
                            text: 'MONTANTE ENTREGUE',
                            alignment: 'left',
                        },
                        { style: 'tableHeader', text: '' },
                        { style: 'tableHeader', text: '' },
                        {
                            style: 'tableHeader',
                            text: new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'AOA',
                            }).format(documentData.amount_received),
                            alignment: 'right',
                        },
                    ]);
                    itemsTable.push([
                        { style: 'tableHeader', text: 'TROCO', alignment: 'left' },
                        { style: 'tableHeader', text: '' },
                        { style: 'tableHeader', text: '' },
                        {
                            style: 'tableHeader',
                            text: new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'AOA',
                            }).format(documentData.change),
                            alignment: 'right',
                        },
                    ]);
                    itemsTable.push([
                        {
                            style: 'tableHeader',
                            text: 'FORMA DE PAGAMENTO',
                            alignment: 'left',
                        },
                        { style: 'tableHeader', text: '' },
                        { style: 'tableHeader', text: '' },
                        {
                            style: 'tableHeader',
                            text: payment.title,
                            alignment: 'right',
                        },
                    ]);
                }
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
                                    width: '50%',
                                    style: ['default'],
                                    columns: [companyData],
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
                                                text: `Referência: ${documentData === null || documentData === void 0 ? void 0 : documentData.reference}`,
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
                                                    text: client.insurance_company[0]
                                                        ? 'Segurado'
                                                        : 'Cliente',
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
                                                    text: client === null || client === void 0 ? void 0 : client.insurance_number,
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
                                client.insurance_company[0]
                                    ? {
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
                                                        text: (_a = client.insurance_company[0]) === null || _a === void 0 ? void 0 : _a.name,
                                                        style: ['bodyStyle'],
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: 'Endereço',
                                                        style: ['bodyStyle'],
                                                    },
                                                    {
                                                        text: (_b = client.insurance_company[0]) === null || _b === void 0 ? void 0 : _b.address,
                                                        style: ['bodyStyle'],
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: 'Contribuinte',
                                                        style: ['bodyStyle'],
                                                    },
                                                    {
                                                        text: (_c = client.insurance_company[0]) === null || _c === void 0 ? void 0 : _c.nif,
                                                        style: ['bodyStyle'],
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: 'Telefone',
                                                        style: ['bodyStyle'],
                                                    },
                                                    {
                                                        text: (_d = client.insurance_company[0]) === null || _d === void 0 ? void 0 : _d.phone_number,
                                                        style: ['bodyStyle'],
                                                    },
                                                ],
                                            ],
                                        },
                                    }
                                    : {
                                        width: '50%',
                                        marginTop: 15,
                                        text: '',
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
                                                    text: new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    }).format(new Date(documentData === null || documentData === void 0 ? void 0 : documentData.emission_date)),
                                                    style: ['bodyStyle'],
                                                },
                                                {
                                                    text: '',
                                                    style: ['bodyStyle'],
                                                    alignment: 'center',
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
                                widths: ['30%', '40%', '15%', '15%'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: 'Serviço/Produto',
                                            style: 'tableHeader',
                                            alignment: 'left',
                                        },
                                        {
                                            text: 'Descrição',
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
                                    text: `Atendido por: ${user === null || user === void 0 ? void 0 : user.name}`,
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
    defineDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const fonts = {
                    Helvetica: {
                        normal: 'Helvetica',
                        bold: 'Helvetica-Bold',
                        italics: 'Helvetica-Oblique',
                        bolditalics: 'Helvetica-BoldOblique',
                    },
                };
                const docDefinition = {
                    pageSize: {
                        width: 80 * 2.83465,
                        height: 'auto',
                    },
                    pageMargins: [10, 10, 10, 10],
                    content: [
                        {
                            text: 'Clinica Alfavida',
                            alignment: 'center',
                            style: { bold: true, fontSize: 14 },
                        },
                        { text: 'Endereço: Zango 1', alignment: 'center', style: 'header' },
                        {
                            text: 'Telefone: 946-803-775',
                            alignment: 'center',
                            style: 'header',
                        },
                        {
                            text: 'Email: clinicaalfavida2020@gmail.com',
                            alignment: 'center',
                            style: 'header',
                        },
                        {
                            text: 'Nº de contibuinte: 5000139777',
                            alignment: 'center',
                            style: ['header'],
                        },
                        {
                            canvas: [
                                { type: 'line', x1: 0, y1: 0, x2: 205, y2: 0, lineWidth: 1 },
                            ],
                            margin: [0, 5, 0, 5],
                        },
                        {
                            text: 'Ref.:' +
                                ' ' +
                                'FR19052024/1\n Data de emissão:  01/04/2024, 08:15\n Serie: 2024 \n Cliente: Orlando Garcia \n Contacto: 924254775',
                            alignment: 'left',
                            style: {
                                fontSize: 8,
                            },
                            margin: [0, 3, 0, 0],
                        },
                        {
                            canvas: [
                                { type: 'line', x1: 0, y1: 0, x2: 205, y2: 0, lineWidth: 1 },
                            ],
                            margin: [0, 5, 0, 5],
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: ['*', '*', '*', '*'],
                                body: [
                                    [
                                        { text: 'Serviço', style: 'tableHeader' },
                                        { text: 'Desc', style: 'tableHeader' },
                                        { text: 'Qtd', style: 'tableHeader' },
                                        { text: 'Preço', style: 'tableHeader' },
                                    ],
                                    ['Raio X', 'Torax AP', '1', '10.000,00'],
                                    [
                                        { text: 'TOTAL', colSpan: 3, alignment: 'right' },
                                        {},
                                        {},
                                        '10.000,00',
                                    ],
                                    [
                                        { text: 'MONTANTE ENTREGUE', colSpan: 3, alignment: 'right' },
                                        {},
                                        {},
                                        '10.000,00',
                                    ],
                                    [
                                        { text: 'TROCO', colSpan: 3, alignment: 'right' },
                                        {},
                                        {},
                                        '0,00',
                                    ],
                                    [
                                        {
                                            text: 'FORMA DE PAGAMENTO',
                                            colSpan: 3,
                                            alignment: 'right',
                                        },
                                        {},
                                        {},
                                        'Dinheiro',
                                    ],
                                ],
                            },
                            fontSize: 8,
                            marginTop: 5,
                        },
                        {
                            text: 'Coordenadas bancárias (BFA) \n Nº de conta: XXX-XXXX-XXX \n IBAN: AO06 XXXX XXXX XXXX XXXX X \n ',
                            alignment: 'left',
                            style: {
                                fontSize: 8,
                            },
                            margin: [0, 3, 0, 0],
                        },
                        {
                            text: 'Emitido por: Usuario Master \n70/0-Processado por programa validado nº 355/AGT/2024 - Alfavida App',
                            alignment: 'center',
                            style: {
                                fontSize: 8,
                            },
                            margin: [0, 3, 0, 0],
                        },
                    ],
                    defaultStyle: {
                        font: 'Helvetica',
                    },
                    styles: {
                        header: {
                            fontSize: 10,
                            lineHeight: 1.2,
                        },
                    },
                };
                const printer = new pdfmake_1.default(fonts);
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
