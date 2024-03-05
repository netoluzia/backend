import express from 'express'
import type { Response, Request } from 'express'
import { ReportController } from '../../controllers/printing/report'

const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
  const reportController = new ReportController()
  const { id } = req.params
  const result = await reportController.handle(id)
  return res.end(result)
})

export default router
