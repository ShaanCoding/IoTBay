import { Static, Type } from '@sinclair/typebox'

export const ErrorDto = Type.Object({
  message: Type.String(),
  code: Type.Number(),
})

export type ErrorDtoType = Static<typeof ErrorDto>