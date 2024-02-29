import express from 'express'
import type { Response, Request } from 'express'
import { MongoGetDocumentsRepository } from '../../repositories/document/get-documents/mongo-get-documents'
import { GetDocumentsController } from '../../controllers/document/get-documents/get-documents'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const getDocumentsRepository = new MongoGetDocumentsRepository()
  const getDocumentsController = new GetDocumentsController(
    getDocumentsRepository
  )
  const { body, statusCode } = await getDocumentsController.handle()
  return res.status(statusCode).send(body)
})

export default router
