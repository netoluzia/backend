import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export function generateToken(user: User): string {
  return jwt.sign({ email: user.email }, 'your_secret_key', {
    expiresIn: '8h',
  })
}
