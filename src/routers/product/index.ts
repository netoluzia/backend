import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetProductsRepository } from '../../repositories/product/get-products/mongo-get-products'
import { GetProductsController } from '../../controllers/product/get-products/get-products'
import { MongoGetProductRepository } from '../../repositories/product/get-product/mongo-get-product'
import { GetProductController } from '../../controllers/product/get-product/get-product'
import { MongoCreateProductRepository } from '../../repositories/product/create-product/mongo-create-product'
import { CreateProductController } from '../../controllers/product/create-product/create-product'
import { MongoUpdateProductRepository } from '../../repositories/product/update-product/mongo-update-product'
import { UpdateProductController } from '../../controllers/product/update-product/update-product'
import { MongoDeleteProductRepository } from '../../repositories/product/delete-product/mongo-delete-product'
import { DeleteProductController } from '../../controllers/product/delete-product/delete-product'

const router = express.Router()

router.get('/index/:category', async (req: Request, res: Response) => {
  const repository = new MongoGetProductsRepository()
  const controller = new GetProductsController(repository)

  const { body, statusCode } = await controller.handle(req.params.category)
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetProductRepository()
  const controller = new GetProductController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateProductRepository()
  const controller = new CreateProductController(repository)

  const { body, statusCode } = await controller.handle({ body: req.body })
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const repository = new MongoUpdateProductRepository()
  const controller = new UpdateProductController(repository)

  const { body, statusCode } = await controller.handle({
    body: req.body,
    params: req.params.id,
  })
  return res.status(statusCode).send(body)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const repository = new MongoDeleteProductRepository()
  const controller = new DeleteProductController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})
export default router
