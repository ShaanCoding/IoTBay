import { Static, Type } from '@sinclair/typebox'
import { UserDto } from './UserDto'

export const UserCollectionDto = Type.Array(UserDto)

export type UserCollectionDtoType = Static<typeof UserCollectionDto>