import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetInsurancesRepository } from '../../repositories/ensurance/get-insurances/mongo-get-insurances'
import { GetInsurancesController } from '../../controllers/ensurance/get-ensurances/get-ensurances'
import { MongoCreateInsuranceRepository } from '../../repositories/ensurance/create-insurance/mongo-create-insurance'
import { CreateInsuranceController } from '../../controllers/ensurance/create-ensurance/create-ensurance'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetInsurancesRepository()
  const controller = new GetInsurancesController(repository)

  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateInsuranceRepository()
  const controller = new CreateInsuranceController(repository)

  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

export default router
