import express from 'express'
import type { Response, Request } from 'express'

import { MongoGetServicesRepository } from '../../repositories/service/get-services/mongo-get-services'
import { GetServicesController } from '../../controllers/service/get-services/get-services'
import { MongoCreateServiceRepository } from '../../repositories/service/create-service/mongo-create-service'
import { CreateServiceController } from '../../controllers/service/create-service/create-service'
import { MongoUpdateServiceRepository } from '../../repositories/service/update-service/mongo-update-service'
import { UpdateServiceController } from '../../controllers/service/update-service/update-service'
import { MongoGetServiceRepository } from '../../repositories/service/get-service/mongo-get-service'
import { GetServiceController } from '../../controllers/service/get-service/get-service'
import { MongoDeleteClientRepository } from '../../repositories/client/delete-client/mongo-delete-client'
import { MongoDeleteServiceRepository } from '../../repositories/service/delete-service/mongo-delete-service'
import { DeleteServiceController } from '../../controllers/service/delete-service/delete-service'
import { MongoAttachMaterialRepository } from '../../repositories/service/attach-material/mongo-attach-material'
import { AttachMaterialController } from '../../controllers/service/attach-material/attach-material'
import { MongoGetMaterialFormServiceRepository } from '../../repositories/service/get-material-from-service/mongo-get-material-form-service'
import { GetMaterialFromService } from '../../controllers/service/get-material-from-service/get-material-from-service'

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

router.patch('/attach-material/:id', async (req: Request, res: Response) => {
  const createServiceRepository = new MongoAttachMaterialRepository()
  const createServiceController = new AttachMaterialController(
    createServiceRepository
  )
  const { body, statusCode } = await createServiceController.handle({
    body: req.body.material,
    params: req.params,
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
  const repository = new MongoGetServiceRepository()
  const controller = new GetServiceController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.get('/materials/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetMaterialFormServiceRepository()
  const controller = new GetMaterialFromService(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const repository = new MongoDeleteServiceRepository()
  const controller = new DeleteServiceController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

export default router
