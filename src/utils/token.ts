import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
export function generateToken(user: User): string {
  return jwt.sign({ email: user.email }, 'alfavida_app_management_clinic', {
    expiresIn: '8h',
  })
}
