import express from 'express'
import type { Response, Request } from 'express'
import { ReportPerMonthController } from '../../controllers/dashboard/report-per-month/report-per-month'
import { MongoGetReportPerMonth } from '../../repositories/dashboard/report-per-month/report-per-month'

const router = express.Router()

router.get('/per-month', async (req: Request, res: Response) => {
  const repository = new MongoGetReportPerMonth()
  const controller = new ReportPerMonthController(repository)
  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

export default router
