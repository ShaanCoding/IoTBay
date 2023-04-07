import { Static, Type } from '@sinclair/typebox'

export const UserDto = Type.Object({
      id: Type.String({ format: "uuid" }),
      email: Type.String({ format: "email" }),
      isStaff: Type.Boolean(),
})

export type UserDtoType = Static<typeof UserDto>