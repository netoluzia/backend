import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetCompany } from '../../repositories/company/get-company/mongo-get-company'
import { GetCompanyController } from '../../controllers/company/get-company/get-company'
import { MongoCreateCompany } from '../../repositories/company/create-company/mongo-create-company'
import { MongoUpdateCompany } from '../../repositories/company/update-company/mongo-update-company'
import { CreateCompanyControler } from '../../controllers/company/create-company/create-company'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetCompany()
  const controller = new GetCompanyController(repository)
  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.post('/:id?', async (req: Request, res: Response) => {
  const repositoryCreate = new MongoCreateCompany()
  const repositoryUpdate = new MongoUpdateCompany()

  const controller = new CreateCompanyControler(
    repositoryCreate,
    repositoryUpdate
  )
  const { body, statusCode } = await controller.handle(req.body, req.params.id)
  return res.status(statusCode).send(body)
})

export default router
