import ExcelJS from 'exceljs'
import path from 'path'
import { prisma } from '../../database/prisma'

export class ExcelReport {
  getMonthRange(year: number, month: number): { start: Date; end: Date } {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59, 999)
    return { start, end }
  }
  addSheetData(sheet: ExcelJS.Worksheet, data: any[]) {
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
    ]

    data.forEach((row) => {
      sheet.addRow(row)
    })

    // Estiliza o cabeçalho
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }, // Cor laranja
      }
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
    })
  }

  async handle(month: number, year: number) {
    const { start, end } = this.getMonthRange(month, year)
    const workbook = new ExcelJS.Workbook()

    const insurances = await prisma.insurance.findMany({
      select: { id: true, name: true, nif: true },
    })

    const data: any = []
    for await (const iterator of insurances) {
      let row = {}
      const invoices = await prisma.invoice.findMany({
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
      })
      invoices.forEach((invoice) => {
        row = {
          nif: iterator.nif,
          name: iterator.name,
          reference: invoice.reference,
          emission_date: invoice.emission_date,
          customer_name: invoice.customer?.name,
          insurance_number: invoice.customer?.insurance_number,
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
        }
        data.push(row)
      })
    }
    insurances.forEach((insurance) => {
      const sheet = workbook.addWorksheet(insurance.name.slice(0, 9))
      this.addSheetData(
        sheet,
        data.filter((item: any) => item.name == insurance.name)
      )
    })

    const filePath = path.join(__dirname, 'relatorio.xlsx')
    await workbook.xlsx.writeFile(filePath)
    return filePath
  }
}
