import { Static, Type } from "@sinclair/typebox";

export const UserDto = Type.Object({
  userId: Type.String({ format: "uuid" }),
  email: Type.String({ format: "email" }),
  userType: Type.String({ enum: ["staff", "customer"] }),
  shippingAddress: Type.Optional(Type.String()),
  billingAddress: Type.Optional(Type.String()),
});

export type UserDtoType = Static<typeof UserDto>;
