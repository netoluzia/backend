import express from 'express'
import type { Response, Request } from 'express'
import { ReportController } from '../../controllers/printing/report'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const reportController = new ReportController()
  const result = await reportController.handle()
  return res.end(result)
})

export default router
