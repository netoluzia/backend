import express from 'express'
import type { Response, Request } from 'express'

import { MongoGetProtocolsRepository } from '../../repositories/protocol/get-protocols/mongo-get-protocols'
import { GetProtocols } from '../../controllers/protocols/get-protocols/get-protocols'
import { MongoCreateProtocol } from '../../repositories/protocol/create-protocol/mongo-create-protocol'
import { CreateProtocolController } from '../../controllers/protocols/create-protocol/create-protocol'
import { MongoGetProtocolRepository } from '../../repositories/protocol/get-protocol/mongo-get-protocol'
import { GetProtocol } from '../../controllers/protocols/get-protocol/get-protocol'
import { MongoUpdateProtocolRepository } from '../../repositories/protocol/update-protocol/mongo-update-protocol'
import { UpdateProtocolController } from '../../controllers/protocols/update-protocol/update-protocol'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetProtocolsRepository()
  const controller = new GetProtocols(repository)

  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetProtocolRepository()
  const controller = new GetProtocol(repository)
  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateProtocol()
  const controller = new CreateProtocolController(repository)
  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const repository = new MongoUpdateProtocolRepository()
  const controller = new UpdateProtocolController(repository)
  const { body, statusCode } = await controller.handle(req.params.id, req.body)
  return res.status(statusCode).send(body)
})

router.delete('/:id', async (req: Request, res: Response) => {
  //   const repository = new MongoDeleteInsuranceRepository()
  //   const controller = new DeleteInsuranceController(repository)
  //   const { body, statusCode } = await controller.handle(req.params.id)
  //   return res.status(statusCode).send(body)
})
export default router
