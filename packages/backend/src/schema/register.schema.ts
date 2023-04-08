import { Static, Type } from '@sinclair/typebox'

export const RegisterSchema = Type.Object({
  email: Type.String({ format: "email"}),
  password: Type.String(),
  name: Type.String(),
  phone: Type.String(),
  address: Type.String(),
}, {
  description: 'RegisterDto',
  $id: 'RegisterDto',
  // $ref: 'RegisterDto',
})

export const RegisterSchemaRef = Type.Ref(RegisterSchema)

export type RegisterSchemaType = Static<typeof RegisterSchema>