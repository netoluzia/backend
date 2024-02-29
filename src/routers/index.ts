import express from 'express'
import user from './user'
import service from './service'
import report from './report'
import document from './document'
import client from './client'
import payment from './payment'

const router = express.Router()

router.use('/users', user)
router.use('/services', service)
router.use('/reports', report)
router.use('/documents', document)
router.use('/clients', client)
router.use('/payments', payment)

export default router
