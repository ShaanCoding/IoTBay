import { Static, Type } from '@sinclair/typebox'

export const LoginDto = Type.Object({
  username: Type.String(),
  password: Type.String(),
}, {
  description: 'LoginDto',
  $id: 'LoginDto',
  // $ref: 'LoginDto',
})

export const LoginDtoRef = Type.Ref(LoginDto)

export type LoginDtoType = Static<typeof LoginDto>