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
                var _a, _b, _c;
                const repository = new mongo_get_document_1.MongoGetDocumentRepository();
                const data = yield repository.getDocument(id);
                const documentData = JSON.parse(JSON.stringify(data));
                const client = documentData.client;
                const companyRepository = new mongo_get_company_1.MongoGetCompany();
                const company = yield companyRepository.getCompany();
                const userGet = new mongo_get_user_1.MongoGetUserRepository();
                const paymentGet = new mongo_get_payment_1.MongoGetPayment();
                let payment;
                if (documentData.document == 'RC' || documentData.document == 'FR')
                    payment = yield paymentGet.getPayment(documentData.payment);
                console.log(documentData);
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
                        {
                            style: 'default',
                            text: `[${item.item}] - ${item.description || ''}`,
                            alignment: 'left',
                        },
                        { style: 'default', text: item.quantity, alignment: 'center' },
                        {
                            style: 'default',
                            text: new Intl.NumberFormat('de-DE', {
                                currency: 'AOA',
                                style: 'currency',
                            })
                                .format(item.unit_price)
                                .slice(0, -3),
                            alignment: 'center',
                        },
                        { style: 'default', text: item.discount, alignment: 'center' },
                        { style: 'default', text: '0.0', alignment: 'center' },
                        { style: 'default', text: '', alignment: 'center' },
                        {
                            style: 'default',
                            text: new Intl.NumberFormat('de-DE', {
                                currency: 'AOA',
                                style: 'currency',
                            })
                                .format(item.total)
                                .slice(0, -3),
                            alignment: 'right',
                        },
                    ];
                    itemsTable.push(element);
                });
                // itemsTable.push([
                //   { style: 'tableHeader', text: 'TOTAL', alignment: 'left' },
                //   { style: 'tableHeader', text: '' },
                //   { style: 'tableHeader', text: '' },
                //   {
                //     style: 'tableHeader',
                //     text: new Intl.NumberFormat('de-DE', {
                //       style: 'currency',
                //       currency: 'AOA',
                //     }).format(documentData.total),
                //     alignment: 'right',
                //   },
                // ])
                if (documentData.document == 'FR' || 'RC') {
                    // itemsTable.push([
                    //   {
                    //     style: 'tableHeader',
                    //     text: 'MONTANTE ENTREGUE',
                    //     alignment: 'left',
                    //   },
                    //   { style: 'tableHeader', text: '' },
                    //   { style: 'tableHeader', text: '' },
                    //   {
                    //     style: 'tableHeader',
                    //     text: new Intl.NumberFormat('de-DE', {
                    //       style: 'currency',
                    //       currency: 'AOA',
                    //     }).format(documentData.amount_received),
                    //     alignment: 'right',
                    //   },
                    // ])
                    // itemsTable.push([
                    //   { style: 'tableHeader', text: 'TROCO', alignment: 'left' },
                    //   { style: 'tableHeader', text: '' },
                    //   { style: 'tableHeader', text: '' },
                    //   {
                    //     style: 'tableHeader',
                    //     text: new Intl.NumberFormat('de-DE', {
                    //       style: 'currency',
                    //       currency: 'AOA',
                    //     }).format(documentData.change),
                    //     alignment: 'right',
                    //   },
                    // ])
                    // itemsTable.push([
                    //   {
                    //     style: 'tableHeader',
                    //     text: 'FORMA DE PAGAMENTO',
                    //     alignment: 'left',
                    //   },
                    //   { style: 'tableHeader', text: '' },
                    //   { style: 'tableHeader', text: '' },
                    //   {
                    //     style: 'tableHeader',
                    //     text: payment.title,
                    //     alignment: 'right',
                    //   },
                    // ])
                }
                let totalDiscount = 0;
                documentData.items.forEach((item) => {
                    totalDiscount += item.discount;
                });
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
                                                text: `Série: ${documentData.serie}`,
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
                            canvas: [
                                { type: 'line', x1: 0, x2: 515, y1: 0, y2: 0, lineWidth: 1 },
                            ],
                            marginTop: 10,
                        },
                        {
                            columns: [
                                { width: '25%', text: 'Data de emissão' },
                                { width: '25%', text: 'Data de vencimento' },
                                { width: '25%', text: 'Moeda' },
                                { width: '25%', text: 'V/Ref.' },
                            ],
                            margin: [0, 3, 0, 2],
                            style: ['default'],
                        },
                        {
                            canvas: [
                                { type: 'line', x1: 0, x2: 515, y1: 0, y2: 0, lineWidth: 1 },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: '25%',
                                    text: new Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    }).format(new Date(documentData === null || documentData === void 0 ? void 0 : documentData.emission_date)),
                                },
                                {
                                    width: '25%',
                                    // text: new Intl.DateTimeFormat('en-GB', {
                                    //   day: 'numeric',
                                    //   month: 'numeric',
                                    //   year: 'numeric',
                                    // }).format(
                                    //   new Date(
                                    //     documentData?.expiryDate || documentData?.emission_date
                                    //   )
                                    // ),
                                    text: '',
                                },
                                { width: '25%', text: 'AOA' },
                                { width: '25%', text: `${documentData === null || documentData === void 0 ? void 0 : documentData.reference}` },
                            ],
                            marginTop: 3,
                            style: ['default'],
                        },
                        {
                            marginTop: 25,
                            table: {
                                widths: ['40%', '10%', '10%', '10%', '10%', '10%', '10%'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: 'Descrição',
                                            style: 'default',
                                            alignment: 'left',
                                        },
                                        {
                                            text: 'Qtd',
                                            style: 'default',
                                            alignment: 'center',
                                        },
                                        {
                                            text: 'Unit.P',
                                            style: 'default',
                                            alignment: 'center',
                                        },
                                        {
                                            text: 'Desc.',
                                            style: 'default',
                                            alignment: 'center',
                                        },
                                        {
                                            text: 'Taxa(%)',
                                            style: 'default',
                                            alignment: 'center',
                                        },
                                        {
                                            text: 'Código',
                                            style: 'default',
                                            alignment: 'center',
                                        },
                                        {
                                            text: 'Valor',
                                            style: 'default',
                                            alignment: 'right',
                                        },
                                    ],
                                    ...itemsTable,
                                ],
                            },
                            layout: {
                                hLineWidth: (i, node) => i === 0 || i === node.table.body.length ? 1 : 0.5,
                                vLineWidth: () => 0,
                                hLineColor: (i, node) => i === 0 || i === node.table.body.length ? 'black' : 'grey',
                            },
                        },
                        {
                            marginTop: 30,
                            columns: [
                                {
                                    width: '60%',
                                    table: {
                                        widths: ['20%', '15%', '30%', '35%'],
                                        body: [
                                            [
                                                {
                                                    text: 'Descrição',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: 'Taxa%',
                                                    style: 'default',
                                                    alignment: 'center',
                                                },
                                                {
                                                    text: 'Incidência',
                                                    style: 'default',
                                                    alignment: 'center',
                                                },
                                                {
                                                    text: 'Valor do imposto',
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'IVA',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: '0.0',
                                                    style: 'default',
                                                    alignment: 'center',
                                                },
                                                {
                                                    text: new Intl.NumberFormat('de-DE', {
                                                        currency: 'AOA',
                                                        style: 'currency',
                                                    })
                                                        .format(documentData.total)
                                                        .slice(0, -3),
                                                    style: 'default',
                                                    alignment: 'center',
                                                },
                                                {
                                                    text: '0.0',
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                        ],
                                    },
                                    layout: {
                                        hLineWidth: (i, node) => i === 0 || i === node.table.body.length ? 1 : 1,
                                        vLineWidth: () => 0,
                                        hLineColor: (i, node) => i === 0 || i === node.table.body.length ? 'black' : 'black',
                                    },
                                },
                                {
                                    width: '40%',
                                    table: {
                                        widths: ['*', '*'],
                                        body: [
                                            [
                                                {
                                                    text: 'Total liquido',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: new Intl.NumberFormat('de-DE', {
                                                        currency: 'AOA',
                                                        style: 'currency',
                                                    })
                                                        .format(documentData.total)
                                                        .slice(0, -3),
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Total de desconto',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: `${totalDiscount}`,
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Total de imposto',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: '0.0',
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Total retenção',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: '0.0',
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    text: 'Total a pagar',
                                                    style: 'default',
                                                    alignment: 'left',
                                                },
                                                {
                                                    text: new Intl.NumberFormat('de-DE', {
                                                        currency: 'AOA',
                                                        style: 'currency',
                                                    })
                                                        .format(documentData.total)
                                                        .slice(0, -3),
                                                    style: 'default',
                                                    alignment: 'right',
                                                },
                                            ],
                                        ],
                                    },
                                    layout: {
                                        hLineWidth: (i, node) => i === 0 || i === 4 || i === node.table.body.length ? 1 : 0,
                                        vLineWidth: () => 0,
                                        hLineColor: (i, node) => i === 0 || i === node.table.body.length ? 'black' : 'black',
                                    },
                                },
                            ],
                            columnGap: 20,
                        },
                        {
                            marginTop: 30,
                            text: `Os bens/serviços foram colocados à disposição do adquirente na data de ${new Intl.DateTimeFormat('en-GB', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            }).format(new Date(documentData === null || documentData === void 0 ? void 0 : documentData.emission_date))} em Luanda`,
                            alignment: 'left',
                            style: ['default'],
                        },
                        {
                            text: `Operador: ${user === null || user === void 0 ? void 0 : user.name}`,
                            alignment: 'left',
                            style: ['default'],
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
                                    text: `${documentData.hash4}` +
                                        '-Processado por programa validado nº 355/AGT/2023 FacilitaSoft (3.1.1)',
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
                            // fillColor: '#06063f',
                            // color: 'white',
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
    defineDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    { text: 'TOTAL', colSpan: 3, alignment: 'right' },
                    {},
                    {},
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
                            text: 'MONTANTE ENTREGUE',
                            alignment: 'right',
                            colSpan: 3,
                        },
                        {},
                        {},
                        {
                            text: new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'AOA',
                            }).format(documentData.amount_received),
                            alignment: 'right',
                        },
                    ]);
                    itemsTable.push([
                        {
                            style: 'tableHeader',
                            text: 'TROCO',
                            alignment: 'right',
                            colSpan: 3,
                        },
                        {},
                        {},
                        {
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
                            alignment: 'right',
                            colSpan: 3,
                        },
                        {},
                        {},
                        {
                            text: payment.title,
                            alignment: 'right',
                        },
                    ]);
                }
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
                            text: `${company.name}`,
                            alignment: 'center',
                            style: { bold: true, fontSize: 14 },
                        },
                        {
                            text: `Endereço: ${company.address}`,
                            alignment: 'center',
                            style: 'header',
                        },
                        {
                            text: `Telefone: ${company.phone_number}`,
                            alignment: 'center',
                            style: 'header',
                        },
                        {
                            text: `Email: ${company.email}`,
                            alignment: 'center',
                            style: 'header',
                        },
                        {
                            text: `Nº de contibuinte: ${company.nif}`,
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
                                `${documentData === null || documentData === void 0 ? void 0 : documentData.reference}\n Data de emissão:  ${new Intl.DateTimeFormat('en-GB', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }).format(new Date(documentData === null || documentData === void 0 ? void 0 : documentData.emission_date))}\n Série: ${documentData.serie} \n Cliente: ${client.name} \n Contacto: ${client.phone_number}\n Cartão: ${(client === null || client === void 0 ? void 0 : client.insurance_number) || ' '}`,
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
                                widths: ['30%', '20%', '10%', '40%'],
                                body: [
                                    [
                                        { text: 'Serviço', style: 'tableHeader' },
                                        { text: 'Desc', style: 'tableHeader' },
                                        { text: 'Qtd', style: 'tableHeader' },
                                        { text: 'Preço', alignment: 'right', style: 'tableHeader' },
                                    ],
                                    ...itemsTable,
                                ],
                            },
                            fontSize: 8,
                            marginTop: 5,
                        },
                        {
                            text: `Coordenadas bancárias (${company.bank}) \n Nº de conta: ${company.account_number} \n IBAN: AO06 ${company.iban} \n `,
                            alignment: 'left',
                            style: {
                                fontSize: 8,
                            },
                            margin: [0, 10, 0, 0],
                        },
                        {
                            text: `Emitido por: ${user && user.name} \n70/0-Processado por programa validado nº 355/AGT/2024 - Alfavida App`,
                            alignment: 'center',
                            style: {
                                fontSize: 6,
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
