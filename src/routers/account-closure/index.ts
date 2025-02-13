import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetAccountClosuresRepository } from '../../repositories/account-closure/get-account-closures/mongo-get-account-closures'
import { GetAccountClosuresController } from '../../controllers/account-closure/get-account-closures/get-account-closures'
import { MongoCreateAccountClosure } from '../../repositories/account-closure/create-account-closure/mongo-create-account-closure'
import { CreateAccountClosureController } from '../../controllers/account-closure/create-account-closure/create-acount-closure'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const getClientsRepository = new MongoGetAccountClosuresRepository()
  const getClientsController = new GetAccountClosuresController(
    getClientsRepository
  )

  const { body, statusCode } = await getClientsController.handle(req.body)
  return res.status(statusCode).send(body)
})

router.post('/create-account', async (req: Request, res: Response) => {
  const createAccountRepository = new MongoCreateAccountClosure()
  const createAccountController = new CreateAccountClosureController(
    createAccountRepository
  )
  const { body, statusCode } = await createAccountController.handle(req.body)

  return res.status(statusCode).send(body)
})

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
