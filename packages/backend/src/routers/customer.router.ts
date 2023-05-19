import { t } from "../trpc";
import { staffProcedure, customerProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";
import {
  CustomerAnonymousSchema,
  CustomerEditMyDetails,
  CustomerEditSchema,
  CustomerSchema,
} from "../schema/customer.schema";

export const customerRouterDefinition = t.router({

  /**
   * Get the currently logged in user's details
   */
  myCustomer: customerProcedure.query(async ({ ctx }) => {
    const customer = await ctx.prisma.customerDetails.findUnique({
      where: {
        userId: ctx.user?.userId,
      },
    });

    if (!customer) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Customer not found",
      });
    }

    return customer;
  }),

  /**
   * Edit my own details
   */
  editMyCustomer: customerProcedure
    .input(CustomerEditMyDetails)
    .mutation(async ({ ctx, input }) => {
      const existingCustomer = await ctx.prisma.customerDetails.findUnique({
        where: {
          userId: ctx.user?.userId,
        },
      });

      if (!existingCustomer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Customer not found",
        });
      }

      const customer = await ctx.prisma.customerDetails.update({
        where: {
          userId: ctx.user?.userId,
        },
        data: {
          isAnonymous: input.isAnonymous,
          sex: input.sex
        }
      });

      return customer;
    }),


  /**
   * Get any customer by id
   * Staff operation because customers can only get their own details
   */
  customer: staffProcedure
  .input(CustomerSchema)
  .query(async ({ ctx, input }) => {
    const customer = await ctx.prisma.customerDetails.findUnique({
      where: {
        userId: input,
      },
    });

    if (!customer) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Customer not found",
      });
    }

    return customer;
  }),


    /**
     * edit customer
     * Staff operation because customers can only edit their own details
     */
    edit: staffProcedure.input(CustomerEditSchema).mutation(async ({ctx, input}) => {
      const existingCustomer = await ctx.prisma.customerDetails.findUnique({
        where: {
          userId: input.userId,
        },
      });

      if (!existingCustomer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Customer not found",
        });
      }

      const customer = await ctx.prisma.customerDetails.update({
        where: {
          userId: input.userId,
        },
        data: {
        isAnonymous: input.isAnonymous,
        sex: input.sex,
        }
      });

      return customer;
    }),
  /**
   * Switch between anonymous mode 
   */
  anonymous: customerProcedure
    .input(CustomerAnonymousSchema)
    .mutation(async ({ ctx, input }) => {

      const existingDetails = await ctx.prisma.customerDetails.findUnique({
        where: {
          userId: ctx.user?.userId
        },
      })

      if (!existingDetails) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Customer not found",
        });
      }

      const customerDetails = await ctx.prisma.customerDetails.update({
        where: {
          userId: ctx.user?.userId
        },
        data: {
          // If the customer specifies if what mode they want to be in, use that, otherwise, toggle
          isAnonymous: input === undefined ? !existingDetails.isAnonymous : input
        },
      });

      return customerDetails;
    }),

  /**
   * Get all customers and their details
   */
    customers: staffProcedure.query(async ({ ctx}) => {
      const customers = await ctx.prisma.customerDetails.findMany();

      return customers;

    })

});