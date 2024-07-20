import express from 'express'
import type { Response, Request } from 'express'
import { ReportController } from '../../controllers/printing/report'
import { MapReportController } from '../../controllers/printing/map'
import { MapProductReportController } from '../../controllers/printing/map-products'
import { InvoicePrintController } from '../../controllers/report-new'
import { ExcelReport } from '../../controllers/excel-report'
const router = express.Router()

import fs from 'fs'
router.get('/:id/:second?', async (req: Request, res: Response) => {
  const reportController = new InvoicePrintController()
  const { id, second } = req.params
  const result = await reportController.handle(id, Boolean(second))
  return res.end(result)
})

router.get('/download/excel/report', async (req: Request, res: Response) => {
  const reportController = new ExcelReport()
  const { year, month } = req.query
  const filePath = await reportController.handle(Number(year), Number(month))
  res.download(filePath, `relatorio-${month}-${year}.xlsx`, (err) => {
    if (err) {
      console.error(err)
    }
    fs.unlinkSync(filePath)
  })
})

router.get('/termal/printing/:id', async (req: Request, res: Response) => {
  const reportController = new ReportController()
  const { id } = req.params
  const result = await reportController.defineDocument(id)
  return res.end(result)
})

router.get('/map/services', async (req: Request, res: Response) => {
  const reportController = new MapReportController()
  const { id } = req.params
  const result = await reportController.handle(id)
  return res.end(result)
})
router.get('/map/products', async (req: Request, res: Response) => {
  const reportController = new MapProductReportController()
  const { id } = req.params
  const result = await reportController.handle(id)
  return res.end(result)
})

export default router
