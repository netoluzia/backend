import express from 'express'
import type { Response, Request } from 'express'

import { MongoGetStockMaterialsRepository } from '../../repositories/materials/get-materials/mongo-get-materials'
import { GetStockMaterialsController } from '../../controllers/materials/get-materials/get-materials'
import { MongoGetStockMaterialRepository } from '../../repositories/materials/get-material/mongo-get-material'
import { GetStockMaterialController } from '../../controllers/materials/get-material/get-material'
import { MongoCreateStockMaterialRepository } from '../../repositories/materials/create-materials/mongo-create-materials'
import { CreateStockMaterialController } from '../../controllers/materials/create-materials/create-materials'
import { MongoUpdateStockMaterialRepository } from '../../repositories/materials/update-materials/mongo-update-material'
import { UpdateStockMaterialController } from '../../controllers/materials/update-materials/update-ensurance'
import { MongoDeleteStockMaterialRepository } from '../../repositories/materials/delete-material/mongo-delete-material'
import { DeleteStockMaterialController } from '../../controllers/materials/delete-material/delete-material'
import { MongoSearchStockMaterial } from '../../repositories/materials/search-material/mongo-search-material'
import { SearchStockMaterial } from '../../controllers/materials/search-material/search-material'
import { MongoAddStockRepository } from '../../repositories/materials/add-stock/mongo-add-stock'
import { AddStockController } from '../../controllers/materials/add-stock/add-stock'
import { MongoGetLogsRepository } from '../../repositories/materials/get-logs/mongo-get-logs'
import { StockLogsController } from '../../controllers/materials/stock-logs/stock-logs'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const repository = new MongoGetStockMaterialsRepository()
  const controller = new GetStockMaterialsController(repository)

  const { body, statusCode } = await controller.handle()
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const repository = new MongoGetStockMaterialRepository()
  const controller = new GetStockMaterialController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.post('/stock-logs', async (req: Request, res: Response) => {
  const repository = new MongoGetLogsRepository()
  const controller = new StockLogsController(repository)

  const { body, statusCode } = await controller.handle(req.body.month)
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateStockMaterialRepository()
  const controller = new CreateStockMaterialController(repository)

  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

router.post('/search', async (req: Request, res: Response) => {
  const repository = new MongoSearchStockMaterial()
  const controller = new SearchStockMaterial(repository)
  const { body, statusCode } = await controller.handle(req.body.search)
  return res.status(statusCode).send(body)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const repository = new MongoUpdateStockMaterialRepository()
  const controller = new UpdateStockMaterialController(repository)

  const { body, statusCode } = await controller.handle(req.params.id, req.body)
  return res.status(statusCode).send(body)
})

router.patch('/add-stock/:id', async (req: Request, res: Response) => {
  const repository = new MongoAddStockRepository()
  const controller = new AddStockController(repository)

  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const repository = new MongoDeleteStockMaterialRepository()
  const controller = new DeleteStockMaterialController(repository)

  const { body, statusCode } = await controller.handle(req.params.id)
  return res.status(statusCode).send(body)
})
export default router
