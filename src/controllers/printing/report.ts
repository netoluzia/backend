import pdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { MongoGetDocumentRepository } from '../../repositories/document/get-document/mongo-get-document'
import { FiscalDoc } from '../../models/Document'
import { MongoGetCompany } from '../../repositories/company/get-company/mongo-get-company'
import { MongoGetUserRepository } from '../../repositories/user/get-user/mongo-get-user'
import { MongoGetPayment } from '../../repositories/payment/get-payment/mongo-get-payment'
const documents = {
  FT: 'Fatura',
  RC: 'Recibo',
  FR: 'Fatura-Recibo',
}
export class ReportController {
  async handle(id: string): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      const repository = new MongoGetDocumentRepository()
      const data = await repository.getDocument(id)
      const documentData = JSON.parse(JSON.stringify(data))

      const client = documentData.client
      const companyRepository = new MongoGetCompany()
      const company = await companyRepository.getCompany()
      const userGet = new MongoGetUserRepository()
      const paymentGet = new MongoGetPayment()
      const payment = await paymentGet.getPayment(documentData.payment)
      const user = await userGet.getUser({
        id: data.attendant,
      })

      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique',
        },
      }

      let itemsTable: any = []
      documentData.items.forEach((item: any) => {
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
        ]
        itemsTable.push(element)
      })
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
      ])

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
        ])
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
        ])
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
        ])
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
      ]
      const printer = new pdfPrinter(fonts)
      let docDefinition: TDocumentDefinitions = {
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
                      text: documents[
                        documentData.document as keyof typeof documents
                      ],
                      alignment: 'right',
                      style: ['header'],
                    },
                    {
                      text: `Referência: ${documentData?.reference}`,
                      alignment: 'right',
                    },
                    {
                      text:
                        'Data de emissão: ' +
                        new Intl.DateTimeFormat('en-GB', {
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        }).format(new Date(documentData?.emission_date)),
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
                        text: client?.insurance_number,
                        style: ['bodyStyle'],
                      },
                    ],
                    [
                      {
                        text: 'Contribuinte',
                        style: ['bodyStyle'],
                      },
                      {
                        text: client?.nif,
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
                            text: client.insurance_company[0]?.name,
                            style: ['bodyStyle'],
                          },
                        ],
                        [
                          {
                            text: 'Endereço',
                            style: ['bodyStyle'],
                          },
                          {
                            text: client.insurance_company[0]?.address,
                            style: ['bodyStyle'],
                          },
                        ],
                        [
                          {
                            text: 'Contribuinte',
                            style: ['bodyStyle'],
                          },
                          {
                            text: client.insurance_company[0]?.nif,
                            style: ['bodyStyle'],
                          },
                        ],
                        [
                          {
                            text: 'Telefone',
                            style: ['bodyStyle'],
                          },
                          {
                            text: client.insurance_company[0]?.phone_number,
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
                        }).format(new Date(documentData?.emission_date)),
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
                text: `Atendido por: ${user?.name}`,
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
      }
      const pdfDoc = printer.createPdfKitDocument(docDefinition)
      const chunks: any[] = []
      pdfDoc.on('data', (chunk) => {
        chunks.push(chunk)
      })
      pdfDoc.end()
      pdfDoc.on('end', () => {
        const result = Buffer.concat(chunks)
        resolve(result)
      })
      pdfDoc.on('error', (error) => {
        reject(error)
      })
    })
  }

  async defineDocument(id: string): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      const repository = new MongoGetDocumentRepository()
      const data = await repository.getDocument(id)
      const documentData = JSON.parse(JSON.stringify(data))

      const client = documentData.client
      const companyRepository = new MongoGetCompany()
      const company = await companyRepository.getCompany()
      const userGet = new MongoGetUserRepository()
      const paymentGet = new MongoGetPayment()
      const payment = await paymentGet.getPayment(documentData.payment)

      const user = await userGet.getUser({
        id: data.attendant,
      })
      let itemsTable: any = []
      documentData.items.forEach((item: any) => {
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
        ]
        itemsTable.push(element)
      })
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
      ])
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
        ])
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
        ])
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
        ])
      }

      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique',
        },
      }
      const docDefinition: TDocumentDefinitions = {
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
            text:
              'Ref.:' +
              ' ' +
              `${
                documentData?.reference
              }\n Data de emissão:  ${new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(documentData?.emission_date))}\n Série: ${
                documentData.serie
              } \n Cliente: ${client.name} \n Contacto: ${
                client.phone_number
              }\n Cartão: ${client?.insurance_number || ' '}`,
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
            text: `Emitido por: ${
              user && user.name
            } \n70/0-Processado por programa validado nº 355/AGT/2024 - Alfavida App`,
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
      }
      const printer = new pdfPrinter(fonts)
      const pdfDoc = printer.createPdfKitDocument(docDefinition)
      const chunks: any[] = []
      pdfDoc.on('data', (chunk) => {
        chunks.push(chunk)
      })
      pdfDoc.end()
      pdfDoc.on('end', () => {
        const result = Buffer.concat(chunks)
        resolve(result)
      })
      pdfDoc.on('error', (error) => {
        reject(error)
      })
    })
  }
}
