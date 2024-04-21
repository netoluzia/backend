import express from 'express'
import type { Response, Request } from 'express'
import { GetReportFinancialController } from '../../controllers/reports/get-report-financial'
import { MongoGetReportFinancialRepository } from '../../repositories/reports/get-report-financial'
const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoGetReportFinancialRepository()
  const reportController = new GetReportFinancialController(repository)
  const { body, statusCode } = await reportController.handle(req.body)
  return res.status(statusCode).send(body)
})

export default router
