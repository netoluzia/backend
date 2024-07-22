import express from 'express'
import type { Response, Request } from 'express'
import { ExemptionController } from '../../controllers/exemption'
import { ExemptionRepository } from '../../repositories/exemption'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new ExemptionRepository()
  const controller = new ExemptionController(repository)
  const response = await controller.index({})
  return res.status(200).send(response)
})

export default router
