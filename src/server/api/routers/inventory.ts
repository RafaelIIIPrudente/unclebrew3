import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({

  //Retrieves all inventory items.
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const items = await ctx.db.inventory.findMany();
      return items;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve inventory items");
    }
  }),

  //Retrieves an inventory item by ID.
  //{number} id - The ID of the inventory item to retrieve.
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const item = await ctx.db.inventory.findUnique({
          where: { id: input.id },
        });
        return item;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to retrieve inventory item with ID ${input.id}`);
      }
    }),
});


