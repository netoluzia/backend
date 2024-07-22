import express from 'express'
import type { Response, Request } from 'express'
import { BalanceController } from '../../controllers/balance'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const type = String(req.query.type)
  const range = String(req.query.range)
  const controller = new BalanceController()
  const response = await controller.show(type, range)
  return res.status(200).send({ body: response })
})

export default router
