import { Static, Type } from "@sinclair/typebox";

export const UserDto = Type.Object({
  userId: Type.String({ format: "uuid" }),
  email: Type.String({ format: "email" }),
  name: Type.String(),
  userType: Type.String({ enum: ["staff", "customer"] }),
  shippingAddress: Type.Optional(Type.String()),
  billingAddress: Type.Optional(Type.String()),
  dob: Type.Optional(Type.String({ format: "date" })),
});


/**
 * userId: string
  email: string
  password: string
  name: string
  phone: string
  address: string
  dob: Date | null
  userType: string
  shippingAddress: string | null
  billingAddress: string | null
 */
export type UserDtoType = Static<typeof UserDto>;
