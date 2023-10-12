import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.product.create({
    data: {
      productName: "Janiuaynon",
      image: "https://via.placeholder.com/150",
      quantity: 50,
      price: 50,
      description: "Coffee From Janiuay",
      inventory: {
        create: {
          name: "Test Inventory",
        },
      },
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })