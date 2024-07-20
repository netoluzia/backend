import type { NextFunction, Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Auth } from '../controllers/auth/protocols'

declare global {
  namespace Express {
    interface Request {
      user?: Auth // Define a propriedade 'user' opcional no Request
    }
  }
}
export class Middlewares {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]
    if (token == null)
      return res
        .status(401)
        .send({ message: 'Token expirado ou sem autorização' })

    jwt.verify(
      token,
      'alfavida_app_management_clinic',
      (err: VerifyErrors | null, user: any) => {
        if (err)
          return res
            .status(401)
            .send({ message: 'Token expirado ou sem autorização' })
        req.user = user
        next()
      }
    )
  }
}
