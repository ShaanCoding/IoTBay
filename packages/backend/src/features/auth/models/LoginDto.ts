import { Static, Type } from '@sinclair/typebox'

export const LoginDto = Type.Object({
  username: Type.String(),
  password: Type.String(),
})
export type LoginDtoType = Static<typeof LoginDto>