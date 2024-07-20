import express from 'express'
import type { Response, Request } from 'express'
import { CompanyRepository } from '../../repositories/company-new'
import { CompanyController } from '../../controllers/company-new'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new CompanyRepository()
  const controller = new CompanyController(repository)
  const { status, ...rest } = await controller.show('id')
  return res.status(status).send(rest)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new CompanyRepository()
  const controller = new CompanyController(repository)
  const { status, ...rest } = await controller.update('id', req.body)
  return res.status(status).send(rest)
})

export default router
