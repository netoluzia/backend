import express from 'express'
import type { Response, Request } from 'express'
import { InvoiceRepository } from '../../repositories/invoice'
import { InvoiceController } from '../../controllers/invoice'
const router = express.Router()

router.get('/index/:category', async (req: Request, res: Response) => {
  const search = (req.query.search as string) || ''
  const page = Number(req.query.page as string) || 1
  const perPage = Number(req.query.perPage as string) || 10
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.index({
    search,
    page,
    perPage,
    category: req.params.category,
  })
  return res.status(status).send(rest)
})

router.get('/insurance/myInvoices', async (req: Request, res: Response) => {
  const search = (req.query.search as string) || ''
  const page = Number(req.query.page as string) || 1
  const perPage = Number(req.query.perPage as string) || 10
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.invoiceFromInsurance(
    {
      search,
      page,
      perPage,
      category: req.params.category,
    },
    String(req.query.insuranceId),
    String(req.query.status)
  )
  return res.status(status).send(rest)
})
router.get(
  '/insurance/myInvoices/total',
  async (req: Request, res: Response) => {
    const repository = new InvoiceRepository()
    const controller = new InvoiceController(repository)
    const { status, ...rest } = await controller.invoiceFromInsuranceTotal(
      String(req.query.insuranceId),
      String(req.query.status)
    )
    return res.status(status).send(rest)
  }
)
router.get('/customer/myInvoices', async (req: Request, res: Response) => {
  const search = (req.query.search as string) || ''
  const page = Number(req.query.page as string) || 1
  const perPage = Number(req.query.perPage as string) || 10
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.invoiceFromCustomer(
    {
      search,
      page,
      perPage,
      category: req.params.category,
    },
    String(req.query.customerId),
    String(req.query.status)
  )
  return res.status(status).send(rest)
})

router.get('/filter/search', async (req: Request, res: Response) => {
  const search = (req.query.search as string) || ''
  const page = Number(req.query.page as string) || 1
  const perPage = Number(req.query.perPage as string) || 10
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.filter(search)
  return res.status(status).send(rest)
})

router.get('/index-by-status/:status', async (req: Request, res: Response) => {
  const search = (req.query.search as string) || ''
  const page = Number(req.query.page as string) || 1
  const perPage = Number(req.query.perPage as string) || 10
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.indexByStatus({
    search,
    page,
    perPage,
    status: req.params.status,
  })
  return res.status(status).send(rest)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.show(id)
  return res.status(status).send(rest)
})

router.delete('/destroy/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.destroy(id)
  return res.status(status).send(rest)
})

router.patch('/soft-delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.softDelete(id)
  return res.status(status).send(rest)
})
router.post('/', async (req: Request, res: Response) => {
  const { body } = req
  const repository = new InvoiceRepository()
  const controller = new InvoiceController(repository)
  const { status, ...rest } = await controller.create(body)
  return res.status(status).send(rest)
})

export default router
