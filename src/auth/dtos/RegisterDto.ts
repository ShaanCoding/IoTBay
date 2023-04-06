import { Static, Type } from '@sinclair/typebox'

export const RegisterDto = Type.Object({
  email: Type.String(),
  password: Type.String(),
})

export type RegisterDtoType = Static<typeof RegisterDto>