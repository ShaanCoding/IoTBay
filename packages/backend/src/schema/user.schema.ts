import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
  email: Type.String({ format: "email" }),
  name: Type.String(),
  userType: Type.String({ enum: ["staff", "customer"] }),
  shippingAddress: Type.Optional(Type.String()),
  billingAddress: Type.Optional(Type.String()),
  dob: Type.Optional(Type.String({ format: "date" })),
}, {
  description: "UserDto",
  $id: "UserDto",
  // $ref: "UserDto",
});

export const UserSchemaRef = Type.Ref(UserSchema);


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
export type UserSchemaType = Static<typeof UserSchema>;
