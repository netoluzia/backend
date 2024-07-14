import express from 'express'
import type { Response, Request } from 'express'
import { ServiceRepository } from '../../repositories/service-new'
import { ServiceController } from '../../controllers/service-new'
const router = express.Router()

router.get('/index/:category', async (req: Request, res: Response) => {
  const search = (req.query.search as string) || ''
  const page = Number(req.query.page as string) || 1
  const perPage = Number(req.query.perPage as string) || 10
  const orderBy = req.query.orderBy || { createdAt: 'desc' }

  const repository = new ServiceRepository()
  const controller = new ServiceController(repository)
  const { status, ...rest } = await controller.index({
    search,
    page,
    perPage,
    orderBy,
    category: req.params.category,
  })
  return res.status(status).send(rest)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new ServiceRepository()
  const controller = new ServiceController(repository)
  const { status, ...rest } = await controller.show(id)
  return res.status(status).send(rest)
})

router.delete('/destroy/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new ServiceRepository()
  const controller = new ServiceController(repository)
  const { status, ...rest } = await controller.destroy(id)
  return res.status(status).send(rest)
})

router.patch('/soft-delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new ServiceRepository()
  const controller = new ServiceController(repository)
  const { status, ...rest } = await controller.softDelete(id)
  return res.status(status).send(rest)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new ServiceRepository()
  const controller = new ServiceController(repository)
  const { status, ...rest } = await controller.update(id, req.body)
  return res.status(status).send(rest)
})

router.post('/', async (req: Request, res: Response) => {
  const { body } = req
  const repository = new ServiceRepository()
  const controller = new ServiceController(repository)
  const { status, ...rest } = await controller.create(body)
  return res.status(status).send(rest)
})

export default router
