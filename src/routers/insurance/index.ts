import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetInsurancesRepository } from '../../repositories/ensurance/get-insurances/mongo-get-insurances'
import { GetInsurancesController } from '../../controllers/ensurance/get-ensurances/get-ensurances'
import { MongoCreateInsuranceRepository } from '../../repositories/ensurance/create-insurance/mongo-create-insurance'
import { CreateInsuranceController } from '../../controllers/ensurance/create-ensurance/create-ensurance'
import { MongoGetInsuranceRepository } from '../../repositories/ensurance/get-insurance/mongo-get-insurance'
import { GetInsuranceController } from '../../controllers/ensurance/get-ensurance/get-insurance'
import { MongoUpdateInsuranceRepository } from '../../repositories/ensurance/update-insurance/mongo-update-insurance'
import { UpdateInsuranceController } from '../../controllers/ensurance/update-ensurance/update-ensurance'
import { MongoDeleteInsuranceRepository } from '../../repositories/ensurance/delete-insurance/mongo-delete-insurance'
import { DeleteInsuranceController } from '../../controllers/ensurance/delete-ensurance/delete-ensurance'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetInsurancesRepository()
  const controller = new GetInsurancesController(repository)

  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetInsuranceRepository()
  const controller = new GetInsuranceController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateInsuranceRepository()
  const controller = new CreateInsuranceController(repository)

  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const repository = new MongoUpdateInsuranceRepository()
  const controller = new UpdateInsuranceController(repository)

  const { body, statusCode } = await controller.handle(req.params.id, req.body)
  return res.status(statusCode).send(body)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const repository = new MongoDeleteInsuranceRepository()
  const controller = new DeleteInsuranceController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})
export default router
