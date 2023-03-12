import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      isbn : z.string(),
      title: z.string(),
      image: z.string()
    }))
    .query(({ input, ctx }) => {
       return ctx.prisma.book.create({
        "data": {
          "isbn": input.isbn,
          "title": input.isbn,
          "image": input.image
        }
      })
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),

  findOne: publicProcedure
  .input(z.object({
    isbn: z.string(),
  }))
  .query(({ ctx, input }) => {
    return ctx.prisma.book.findUnique({
      "where": {
        "isbn": input.isbn
      },
    });
  }),

  update: publicProcedure
  .input(z.object({
    isbn: z.string(),
  }))
  .query(({ ctx, input }) => {
    return ctx.prisma.book.update({
      "where": {
        "isbn": input.isbn
      },
      "data": {
        // TODO
      }
    });
  }),

  delete: publicProcedure
  .input(z.object({
    isbn: z.string(),
  }))
  .query(({ ctx, input }) => {
    return ctx.prisma.book.delete({
      "where": {
        "isbn": input.isbn
      },
    });
  }),
});
