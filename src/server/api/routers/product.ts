import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({

  // Retrieves all products from the database.
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.db.product.findMany();
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve products from the database.");
    }
  }),

  // Retrieves a product by its ID from the database.
  // @param {number} id - The ID of the product to retrieve.
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const product = await ctx.db.product.findUnique({
          where: { id: input.id },
        });
        return product;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to retrieve product with ID ${input.id} from the database.`);
      }
    }),

  // Creates a new product in the database.
  // @param {Product} product - The product object to create.
  create: publicProcedure
    .input(
      z.object({
        productName: z.string(),
        image: z.string().optional(),
        quantity: z.number().int().min(0),
        price: z.number().min(0),
        description: z.string().optional(),
        inventoryId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const product = await ctx.db.product.create({
          data: {
            productName: input.productName,
            image: input.image,
            quantity: input.quantity,
            price: input.price,
            description: input.description,
            inventory: {
              connect: { id: input.inventoryId },
            },
          },
        });
        return product;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create product in the database.");
      }
    }),

  // Updates an existing product in the database.
  // @param {string} id - The ID of the product to update.
  // @param product - The updated product object.
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        productName: z.string().optional(),
        image: z.string().optional(),
        quantity: z.number().int().min(0).optional(),
        price: z.number().min(0).optional(),
        description: z.string().optional(),
        inventoryId: z.string().optional(),
      })
    )
    .mutation<{ id: string }>(async ({ input, ctx }) => {
      try {
        const product = await ctx.db.product.update({
          where: { id: input.id },
          data: {
            productName: input.productName,
            image: input.image,
            quantity: input.quantity,
            price: input.price,
            description: input.description,
            inventoryId: input.inventoryId,
          },
        });
        return product;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to update product with ID ${input.id} in the database.`);
      }
    }),

  // Deletes a product from the database.
  // @param {string} id - The ID of the product to delete.
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation<{ id: string }>(async ({ input, ctx }) => {
      try {
        const product = await ctx.db.product.delete({
          where: { id: input.id },
        });
        return product;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete product with ID ${input.id} from the database.`);
      }
    }),
});
