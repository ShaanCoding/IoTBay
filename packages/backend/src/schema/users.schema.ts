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
  description: "UserSchema",
  $id: "UserSchema",
});

export const UserSchemaRef = Type.Ref(UserSchema);

export type UserSchemaType = Static<typeof UserSchema>;

export const UserCollectionSchema = Type.Array(UserSchemaRef, {
    description: 'UserCollectionSchema',
    $id: 'UserCollectionSchema',
})

export const UserCollectionSchemaRef = Type.Ref(UserCollectionSchema)

export type UserCollectionSchemaType = Static<typeof UserCollectionSchema>