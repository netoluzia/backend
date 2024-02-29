import express from 'express'
import type { Response, Request } from 'express'
import { MongoCreatePaymentRepository } from '../../repositories/payment/create-payment/mongo-create-payment'
import { CreatePaymentController } from '../../controllers/payment/create-payment/create-payment'
import { MongoGetPaymentsRepository } from '../../repositories/payment/get-payments/get-payments'
import { GetPaymentsController } from '../../controllers/payment/get-payments/get-payments'
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
  //   const { statusCode, body } = await updateClientController.handle(
  //     req.params.id,
  //     req.body
  //   )
  //   return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  // Pegar um;'ao
})
router.delete('/:id', async (req: Request, res: Response) => {
  // Deletar um;'ao
})

export default router
