import { z } from "zod";
import { t } from "../trpc";
import { loggedInProcedure, publicProcedure, staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";
import { UserSchema } from "../schema/user.schema";

export const userRouterDefinition = t.router({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.req.user;
  }),

  user: staffProcedure.input(UserSchema).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        userId: input,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not found",
      });
    }

    return user;
  }),
  
  users: staffProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();

    return users.map(({ password, ...user }) => user);
  }),

  deleteMe: loggedInProcedure.mutation(async ({ ctx }) => {
    if (!ctx.req.user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not found",
      });
    }

    const {password, ...user} = await ctx.prisma.user.delete({
      where: {
        userId: ctx.req.user.userId,
      },
    });

    return user;
  }),

  deleteUser: staffProcedure.input(UserSchema).mutation(async ({ ctx, input }) => {
    const { password, ...user } = await ctx.prisma.user.delete({
      where: {
        userId: input,
      },
    });

    return user;
  })
});
