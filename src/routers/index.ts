import { Middlewares } from '../middlewares/token'
import express from 'express'

import user from './user'
import service from './service'
import product from './product'
import report from './report'
import document from './document'
import client from './client'
import payment from './payment'
import insurance from './insurance'
import auth from './auth'
import attending from './attending'
import company from './company'
import reports from './reports'
import dashboard from './dashboard'
import protocol from './protocol'
import account_closure from './account-closure'
import material from './material'
import balance from './balance'
import exemption from './exemption'

import customer from './customer'
import finance from './finance'
import invoice from './invoice'
import insuranceNew from './insurance-new'
import userNew from './user-new'
import materialNew from './material-new'
import serviceNew from './service-new'
import authNew from './auth-new'
import protocolNew from './protocol-new'
import paymentNew from './payment-new'
import companyNew from './company-new'
import partner from './partner'

const router = express.Router()
const middleware = new Middlewares()

router.use('/auth', auth)

router.use('/users', /*middleware.verifyToken,*/ user)
router.use('/services', /*middleware.verifyToken,*/ service)
router.use('/products', /*middleware.verifyToken,*/ product)
router.use('/reports', report)
router.use('/balances', balance)
router.use('/documents', /*middleware.verifyToken,*/ document)
router.use('/clients', /*middleware.verifyToken,*/ client)
router.use('/payments', /*middleware.verifyToken,*/ payment)
router.use('/insurances', /*middleware.verifyToken,*/ insurance)
router.use('/protocols', /*middleware.verifyToken,*/ protocol)
router.use('/company', /*middleware.verifyToken,*/ company)
router.use('/attendings', /*middleware.verifyToken,*/ attending)
router.use('/dashboard', /*middleware.verifyToken,*/ dashboard)
router.use('/materials', /*middleware.verifyToken,*/ material)
router.use('/customers', /*middleware.verifyToken,*/ customer)
router.use('/finances', /*middleware.verifyToken,*/ finance)
router.use('/invoices', /*middleware.verifyToken,*/ invoice)
router.use('/partners', /*middleware.verifyToken,*/ partner)
router.use('/exemptions', /*middleware.verifyToken,*/ exemption)
router.use('/insurance-new', /*middleware.verifyToken,*/ insuranceNew)
router.use('/user-new', /*middleware.verifyToken,*/ userNew)
router.use('/material-new', /*middleware.verifyToken,*/ materialNew)
router.use('/service-new', /*middleware.verifyToken,*/ serviceNew)
router.use('/auth-new', authNew)
router.use('/protocol-new', /*middleware.verifyToken,*/ protocolNew)
router.use('/payment-new', /*middleware.verifyToken,*/ paymentNew)
router.use('/company-new', /*middleware.verifyToken,*/ companyNew)
router.use('/account-closure', /*middleware.verifyToken,*/ account_closure)
router.use('/reports-financial', /*middleware.verifyToken,*/ reports)

export default router
