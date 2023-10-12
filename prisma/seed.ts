/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      productName: "Test Product",
      image: "https://via.placeholder.com/150",
      quantity: 5,
      price: 5.99,
      description: "This is a test product.",
      inventory: {
        create: {
          name: "Test Inventory",
        },
      },
    },
  });

  console.log(product);

  const inventory = await prisma.inventory.create({
    data: {
      name: "Test Inventory",
    },


  });
  console.log(inventory);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
