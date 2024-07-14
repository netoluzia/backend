import { Category, InvoiceType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.customer.updateMany({
    where: { deletedAt: undefined },
    data: {
      deletedAt: null,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e.message)
    await prisma.$disconnect()
    process.exit(1)
  })
