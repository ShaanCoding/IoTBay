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