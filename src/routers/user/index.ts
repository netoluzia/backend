import express from 'express'
import type { Response, Request } from 'express'

import { MongoGetUsersRepository } from '../../repositories/user/get-users/mongo-get-users'
import { GetUsersController } from '../../controllers/user/get-users/get-users'
import { MongoCreateUserRepository } from '../../repositories/user/create-user/mongo-create-user'
import { CreateUserController } from '../../controllers/user/create-user/create-user'
import { MongoGetUserRepository } from '../../repositories/user/get-user/mongo-get-user'
import { GetUserController } from '../../controllers/user/get-user/get-user'
import { MongoDeleteUserRepository } from '../../repositories/user/delete-user/mongo-delete-user'
import { DeleteUserController } from '../../controllers/user/delete-user/delete-user'
import { MongoUpdateUserRepository } from '../../repositories/user/update-user/mongo-update-user'
import { UpdateUserController } from '../../controllers/user/update-user/update-user'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const getUsersRepository = new MongoGetUsersRepository()
  const getUserController = new GetUsersController(getUsersRepository)

  const { body, statusCode } = await getUserController.handle()
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const createUserRepository = new MongoCreateUserRepository()
  const getUserRepository = new MongoGetUserRepository()
  const createUserController = new CreateUserController(
    createUserRepository,
    getUserRepository
  )

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  })

  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  // Atualiza;'ao
  const repository = new MongoUpdateUserRepository()
  const controller = new UpdateUserController(repository)
  const { body, statusCode } = await controller.handle(req.params.id, req.body)

  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetUserRepository()
  const controller = new GetUserController(repository)
  const { body, statusCode } = await controller.getUser({ id: req.params.id })

  return res.status(statusCode).send(body)
})
router.delete('/:id', async (req: Request, res: Response) => {
  const repository = new MongoDeleteUserRepository()
  const controller = new DeleteUserController(repository)
  const { body, statusCode } = await controller.handle(req.params.id)

  return res.status(statusCode).send(body)
})

export default router
