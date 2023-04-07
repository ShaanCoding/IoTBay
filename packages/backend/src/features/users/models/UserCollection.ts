import { Static, Type } from '@sinclair/typebox'
import { UserDto } from './UserDto'

export const UserCollectionDto = Type.Array(UserDto, {
    description: 'UserCollectionDto',
})

export type UserCollectionDtoType = Static<typeof UserCollectionDto>