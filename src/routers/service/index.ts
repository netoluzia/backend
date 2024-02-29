import express from 'express'
import type { Response, Request } from 'express'

import { MongoGetServicesRepository } from '../../repositories/service/get-services/mongo-get-services'
import { GetServicesController } from '../../controllers/service/get-services/get-services'
import { MongoCreateServiceRepository } from '../../repositories/service/create-service/mongo-create-service'
import { CreateServiceController } from '../../controllers/service/create-service/create-service'
import { MongoUpdateServiceRepository } from '../../repositories/service/update-service/mongo-update-service'
import { UpdateServiceController } from '../../controllers/service/update-service/update-service'

const router = express.Router()

router.get('/index/:type', async (req: Request, res: Response) => {
  const getServicesRepository = new MongoGetServicesRepository()
  const getServicesController = new GetServicesController(getServicesRepository)

  const { statusCode, body } = await getServicesController.handle(
    req.params.type
  )

  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const createServiceRepository = new MongoCreateServiceRepository()
  const createServiceController = new CreateServiceController(
    createServiceRepository
  )

  const { body, statusCode } = await createServiceController.handle({
    body: req.body,
  })
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const updateServiceRepository = new MongoUpdateServiceRepository()
  const updateServiceController = new UpdateServiceController(
    updateServiceRepository
  )

  const { body, statusCode } = await updateServiceController.handle({
    body: req.body,
    params: req.params.id,
  })

  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  // Pegar um;'ao
})
router.delete('/:id', async (req: Request, res: Response) => {
  // Deletar um;'ao
})

export default router
