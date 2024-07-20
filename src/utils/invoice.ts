import { InvoiceType } from '@prisma/client'
import { prisma } from '../database/prisma'

export const generateHashes = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+[]{}|<>?'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function generateReference(document: string): Promise<string> {
  const [dia, mes, ano] = new Date().toLocaleDateString('pt-BR').split('/')
  const count = await prisma.invoice.count({
    where: { type: document as InvoiceType },
  })
  return `${document} ${dia}${mes}${ano}/${count + 1}`
}
