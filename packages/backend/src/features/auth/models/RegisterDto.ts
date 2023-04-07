import { Static, Type } from '@sinclair/typebox'

export const RegisterDto = Type.Object({
  email: Type.String({ format: "email"}),
  password: Type.String(),
  name: Type.String(),
  phone: Type.String(),
  address: Type.String(),
}, {
  description: 'RegisterDto',
})

export type RegisterDtoType = Static<typeof RegisterDto>