import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetAccountClosuresRepository } from '../../repositories/account-closure/get-account-closures/mongo-get-account-closures'
import { GetAccountClosuresController } from '../../controllers/account-closure/get-account-closures/get-account-closures'
const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const getClientsRepository = new MongoGetAccountClosuresRepository()
  const getClientsController = new GetAccountClosuresController(
    getClientsRepository
  )

  console.log(req.body)
  const { body, statusCode } = await getClientsController.handle(req.body)
  return res.status(statusCode).send(body)
})

// router.post('/', async (req: Request, res: Response) => {
//   const createClientRepository = new MongoCreateClientRepository()
//   const createClientController = new CreateClientController(
//     createClientRepository
//   )
//   const { body, statusCode } = await createClientController.handle(req.body)

//   return res.status(statusCode).send(body)
// })

// router.patch('/:id', async (req: Request, res: Response) => {
//   const updateClientRepository = new MongoUpdateClientRepository()
//   const updateClientController = new UpdateClientController(
//     updateClientRepository
//   )
//   const { statusCode, body } = await updateClientController.handle(
//     req.params.id,
//     req.body
//   )

//   return res.status(statusCode).send(body)
// })

// router.get('/:id', async (req: Request, res: Response) => {
//   // Pegar um;'ao
//   const repository = new MongoGetClientRepository()
//   const controller = new GetClientController(repository)

//   const { body, statusCode } = await controller.handle(req.params.id)
//   return res.status(statusCode).send(body)
// })
// router.delete('/:id', async (req: Request, res: Response) => {
//   // Deletar um;'ao
//   const repository = new MongoDeleteClientRepository()
//   const controller = new DeleteClientController(repository)
//   const { body, statusCode } = await controller.handle(req.params.id)
//   return res.status(statusCode).send(body)
// })

export default router
