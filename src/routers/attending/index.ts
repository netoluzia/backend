import express from 'express'
import type { Response, Request } from 'express'
import { MongoCreateAttendingRepository } from '../../repositories/attending/create-attending/mongo-create-attending'
import { CreateAttendingController } from '../../controllers/attending/create-attending/create-attending'
import { MongoUpdateAttendingRepository } from '../../repositories/attending/update-attending/mongo-update-attending'
import { UpdateAttendingController } from '../../controllers/attending/update-attending/update-attending'
import { Socket } from 'socket.io'
import { MongoGetAttendingsRepository } from '../../repositories/attending/get-attendings/mongo-get-attendings'
import { GetAttendingsController } from '../../controllers/attending/get-attendings/get-attendings'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetAttendingsRepository()
  const controller = new GetAttendingsController(repository)
  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateAttendingRepository()
  const controller = new CreateAttendingController(
    repository,
    req.app.get('io') as Socket
  )
  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const repository = new MongoUpdateAttendingRepository()
  const controller = new UpdateAttendingController(repository)
  const { body, statusCode } = await controller.handle(req.params.id, req.body)
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  // Pegar um;'ao
  //   const { body, statusCode } = await controller.handle(req.params.id)
  //   return res.status(statusCode).send(body)
})
router.delete('/:id', async (req: Request, res: Response) => {
  // Deletar um;'ao
  //   const { body, statusCode } = await controller.handle(req.params.id)
  //   return res.status(statusCode).send(body)
})

export default router
