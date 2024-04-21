import pdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { MongoGetDocumentRepository } from '../../repositories/document/get-document/mongo-get-document'
import { FiscalDoc } from '../../models/Document'
import { MongoGetCompany } from '../../repositories/company/get-company/mongo-get-company'
import { MongoGetUserRepository } from '../../repositories/user/get-user/mongo-get-user'
import { MongoGetPayment } from '../../repositories/payment/get-payment/mongo-get-payment'
const documents = {
  FT: 'Fatura',
  RG: 'Recibo',
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
        {
          style: 'tableHeader',
          text: new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'AOA',
          }).format(documentData.total),
          alignment: 'right',
        },
      ])

      if (documentData.document == 'FR' || 'RG') {
        itemsTable.push([
          {
            style: 'tableHeader',
            text: 'MONTANTE ENTREGUE',
            alignment: 'left',
          },
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
                        text: '--',
                        style: ['bodyStyle'],
                      },
                      {
                        text: '--',
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
}
