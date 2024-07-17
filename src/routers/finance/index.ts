import express from 'express'
import type { Response, Request } from 'express'
import { FinanceRepository } from '../../repositories/finance'
import { FinanceController } from '../../controllers/finance'
const router = express.Router()

router.get('/receipt', async (req: Request, res: Response) => {
  const repository = new FinanceRepository()
  const controller = new FinanceController(repository)
  const { status, ...rest } = await controller.receipt()
  return res.status(status).send(rest)
})

export default router
