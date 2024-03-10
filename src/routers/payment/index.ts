import express from 'express'
import type { Response, Request } from 'express'
import { MongoCreatePaymentRepository } from '../../repositories/payment/create-payment/mongo-create-payment'
import { CreatePaymentController } from '../../controllers/payment/create-payment/create-payment'
import { MongoGetPaymentsRepository } from '../../repositories/payment/get-payments/get-payments'
import { GetPaymentsController } from '../../controllers/payment/get-payments/get-payments'
import { MongoUpdatePaymentRepository } from '../../repositories/payment/update-payment/update-payment'
import { UpdatePaymentController } from '../../controllers/payment/update-payment/update-payment'
import { MongoGetPayment } from '../../repositories/payment/get-payment/mongo-get-payment'
import { GetPaymentController } from '../../controllers/payment/get-payment/get-payment'
import { MongoDeletePayment } from '../../repositories/payment/delete-payment/mongo-delete-payment'
import { DeletePaymentController } from '../../controllers/payment/delete-payment/delete-payment'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetPaymentsRepository()
  const controller = new GetPaymentsController(repository)
  const { statusCode, body } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const createPaymentRepository = new MongoCreatePaymentRepository()
  const createPaymentController = new CreatePaymentController(
    createPaymentRepository
  )
  const { body, statusCode } = await createPaymentController.handle(req.body)
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const repository = new MongoUpdatePaymentRepository()
  const controller = new UpdatePaymentController(repository)

  const { body, statusCode } = await controller.handle(req.params.id, req.body)
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetPayment()
  const controller = new GetPaymentController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})
router.delete('/:id', async (req: Request, res: Response) => {
  const repository = new MongoDeletePayment()
  const controller = new DeletePaymentController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

export default router
