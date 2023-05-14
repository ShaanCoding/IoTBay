import { t } from "../trpc";
import { staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import {
  StaffActivateSchema,
  StaffCreateSchema,
  StaffDeactivateSchema,
  StaffDeleteSchema,
  StaffListSchema,
} from "../schema/staff.schema";
import { StaffDetails, User } from "@prisma/client";

export const staffRouterDefinition = t.router({
  /**
   * Create a new staff user from an existing account
   */
  activate: staffProcedure
    .input(StaffActivateSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, ...user } = await ctx.prisma.user.update({
        where: {
          userId: input.userId,
        },
        data: {
          userType: "staff",
          staffDetails: {
            create: {
              position: input.position,
              isActivated: true,
            },
          },
        },
        include: {
          staffDetails: true,
        },
      });

      return user;
    }),
  /**
   * Remove a staff user from an existing account
   */
  deactivate: staffProcedure
    .input(StaffDeactivateSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, ...user } = await ctx.prisma.user.update({
        where: {
          userId: input,
        },
        data: {
          userType: "customer",
          staffDetails: {
            update: {
              isActivated: false,
            },
          },
        },
        include: {
          staffDetails: true,
        },
      });

      return user;
    }),
  /**
   * Get all staff users and their staff details
   */
  staff: staffProcedure.input(StaffListSchema).query(async ({ ctx, input }) => {
    const users = (await ctx.prisma.user.findMany({
      where: {
        userType: "staff",
        staffDetails: input?.position
          ? {
              position: input.position,
            }
          : {
              isNot: null,
            },
      },
      include: {
        staffDetails: true,
      },
    })) as (User & {
      staffDetails: StaffDetails;
    })[];

    users.at(0)?.staffDetails;

    return users.map(({ password, ...user }) => user);
  }),
  /**
   * Create a new staff user from blank
   */
  create: staffProcedure
    .input(StaffCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const password = await argon2.hash(input.password);

      const { password: _, ...user } = await ctx.prisma.user.create({
        data: {
          userType: "staff",
          staffDetails: {
            create: {
              position: input.position,
              isActivated: true,
            },
          },
          email: input.email,
          password,
          name: input.name,
          phone: input.phone,
          address: input.address,
        },
        include: {
          staffDetails: true,
        },
      });
      return user;
    }),

  delete: staffProcedure
    .input(StaffDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      // the userId from the input
      const userId = input;

      // Delete the user
      const { password, ...user } = await ctx.prisma.user.delete({
        where: {
          userId: userId,
        },
        include: {
          staffDetails: true,
        },
      });

      // Return the deleted user
      return user;
    }),
});

// export const deleteStaff = async (
//     request: FastifyRequest<{ Params: StaffSchemaType  }>,
//     reply: FastifyReply
//   ) => {
//     const userId = request.params.userId;

//     const user = await prisma.user.delete({
//       where: {
//         userId: userId,
//       },
//     });

//     return reply.status(200).send(user);
//   };
