import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetClientsRepository } from '../../repositories/client/get-clients/mongo-get-clients'
import { GetClientsController } from '../../controllers/client/get-clients/get-clients'
import { MongoCreateClientRepository } from '../../repositories/client/create-client/mongo-create-client'
import { CreateClientController } from '../../controllers/client/create-client/create-client'
import { MongoUpdateClientRepository } from '../../repositories/client/update-client/mongo-update-client'
import { UpdateClientController } from '../../controllers/client/update-client/update-client'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const getClientsRepository = new MongoGetClientsRepository()
  const getClientsController = new GetClientsController(getClientsRepository)
  const { body, statusCode } = await getClientsController.handle()
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const createClientRepository = new MongoCreateClientRepository()
  const createClientController = new CreateClientController(
    createClientRepository
  )
  const { body, statusCode } = await createClientController.handle(req.body)

  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const updateClientRepository = new MongoUpdateClientRepository()
  const updateClientController = new UpdateClientController(
    updateClientRepository
  )
  const { statusCode, body } = await updateClientController.handle(
    req.params.id,
    req.body
  )

  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  // Pegar um;'ao
})
router.delete('/:id', async (req: Request, res: Response) => {
  // Deletar um;'ao
})

export default router
