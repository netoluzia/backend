import express from 'express'
import type { Response, Request } from 'express'
import { ReportController } from '../../controllers/printing/report'
import { MapReportController } from '../../controllers/printing/map'
import { MapProductReportController } from '../../controllers/printing/map-products'
const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
  const reportController = new ReportController()
  const { id } = req.params
  const result = await reportController.handle(id)
  return res.end(result)
})

router.get('/termal/printing', async (req: Request, res: Response) => {
  console.log('hey')
  const reportController = new ReportController()
  const { id } = req.params
  const result = await reportController.defineDocument()
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
