import express from 'express'
import type { Response, Request } from 'express'
import { LoginController } from '../../controllers/auth/login'
import { MongoGetUserRepository } from '../../repositories/user/get-user/mongo-get-user'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const repository = new MongoGetUserRepository()
  const controller = new LoginController(repository)
  const { body, statusCode } = await controller.handle(req.body)

  return res.status(statusCode).send(body)
})

export default router
