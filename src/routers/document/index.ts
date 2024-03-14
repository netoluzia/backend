import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetDocumentsRepository } from '../../repositories/document/get-documents/mongo-get-documents'
import { GetDocumentsController } from '../../controllers/document/get-documents/get-documents'
import { MongoCreateDocumentRepository } from '../../repositories/document/create-document/mongo-create-document'
import { CreateDocumentController } from '../../controllers/document/create-document/create-document'
import { MongoGetDocumentRepository } from '../../repositories/document/get-document/mongo-get-document'
import { GetDocumentController } from '../../controllers/document/get-document/get-documents'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const getDocumentsRepository = new MongoGetDocumentsRepository()
  const getDocumentsController = new GetDocumentsController(
    getDocumentsRepository
  )
  const { body, statusCode } = await getDocumentsController.handle()
  return res.status(statusCode).send(body)
})

router.get('/:id', async (req: Request, res: Response) => {
  const getDocumentRepository = new MongoGetDocumentRepository()
  const getDocumentController = new GetDocumentController(getDocumentRepository)
  const { body, statusCode } = await getDocumentController.handle(req.params.id)
  return res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const repository = new MongoCreateDocumentRepository()
  const controller = new CreateDocumentController(repository)
  const { body, statusCode } = await controller.handle(req.body)
  return res.status(statusCode).send(body)
})

export default router
