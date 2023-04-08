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

export type UserSchemaType = Static<typeof UserSchema>;

export const UserCollectionSchema = Type.Array(UserSchemaRef, {
    description: 'UserCollectionDto',
    $id: 'UserCollectionDto',
    // $ref: 'UserCollectionDto',
})

export const UserCollectionSchemaRef = Type.Ref(UserCollectionSchema)

export type UserCollectionSchemaType = Static<typeof UserCollectionSchema>