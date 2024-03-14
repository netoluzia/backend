import { Middlewares } from '../middlewares/token'
import express from 'express'

import user from './user'
import service from './service'
import report from './report'
import document from './document'
import client from './client'
import payment from './payment'
import insurance from './insurance'
import auth from './auth'

const router = express.Router()
const middleware = new Middlewares()

// testando
router.use('/users', middleware.verifyToken, user)
router.use('/services', middleware.verifyToken, service)
router.use('/reports', report)
router.use('/documents', middleware.verifyToken, document)
router.use('/clients', middleware.verifyToken, client)
router.use('/payments', middleware.verifyToken, payment)
router.use('/insurances', middleware.verifyToken, insurance)
router.use('/auth', auth)

export default router
