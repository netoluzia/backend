import pdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { MongoGetDocumentRepository } from '../../repositories/document/get-document/mongo-get-document'
import { FiscalDoc } from '../../models/Document'
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
      ])
      const printer = new pdfPrinter(fonts)
      let docDefinition: TDocumentDefinitions = {
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
