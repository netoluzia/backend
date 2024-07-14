import express from 'express'
import type { Response, Request } from 'express'
import { AuthController } from '../../controllers/auth-new'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const controller = new AuthController()
  const { status, ...rest } = await controller.login(req.body)

  return res.status(status).send(rest)
})

export default router
