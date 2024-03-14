import express from 'express'
import type { Response, Request } from 'express'

import { MongoGetUsersRepository } from '../../repositories/user/get-users/mongo-get-users'
import { GetUserController } from '../../controllers/user/get-users/get-users'
import { MongoCreateUserRepository } from '../../repositories/user/create-user/mongo-create-user'
import { CreateUserController } from '../../controllers/user/create-user/create-user'
import { MongoGetUserRepository } from '../../repositories/user/get-user/mongo-get-user'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const getUsersRepository = new MongoGetUsersRepository()
  const getUserController = new GetUserController(getUsersRepository)

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
})

router.get('/:id', async (req: Request, res: Response) => {
  // Pegar um;'ao
})
router.delete('/:id', async (req: Request, res: Response) => {
  // Deletar um;'ao
})

export default router
