import pdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { MongoGetCompany } from '../../repositories/company/get-company/mongo-get-company'
import { MongoClient } from '../../database/mongo'
import { Product } from '../../models/Product'

export class MapProductReportController {
  async handle(id: string): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      const companyRepository = new MongoGetCompany()
      const company = await companyRepository.getCompany()

      const products = await MongoClient.db
        .collection<Omit<Product, 'id'>>('product')
        .find({})
        .sort({ category: -1 })
        .toArray()
      let itemsTable: any = []
      products.forEach((item: any) => {
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
        ]
        itemsTable.push(element)
      })
      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique',
        },
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
