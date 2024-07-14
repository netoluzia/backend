import { prisma } from '../database/prisma'
import bcrypt from 'bcrypt'
function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

let count = 1
export async function generate(
  name: string
): Promise<{ username: string; password: string }> {
  let nameClean = removeAccents(name).toLowerCase()
  let nameParts = nameClean.split(' ')
  let firstName = nameParts[0]
  let lastName = nameParts[nameParts.length - 1]
  let username = '$' + firstName + '.' + lastName
  const exists = await prisma.user.findUnique({ where: { username } })
  if (exists) {
    count += 1
    await generate(name + count)
  }
  const hashPawword = await bcrypt.hash(firstName, 10)
  return { username, password: hashPawword }
}
