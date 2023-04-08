import { Static, Type } from '@sinclair/typebox'

export const LoginSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
}, {
  description: 'LoginDto',
  $id: 'LoginDto',
  // $ref: 'LoginDto',
})

export const LoginSchemaRef = Type.Ref(LoginSchema)

export type LoginSchemaType = Static<typeof LoginSchema>