import { Static, Type } from '@sinclair/typebox'
import { UserDto } from './UserDto'

export const UserCollectionDto = Type.Array(UserDto, {
    description: 'UserCollectionDto',
    $id: 'UserCollectionDto',
    // $ref: 'UserCollectionDto',
})

export const UserCollectionDtoRef = Type.Ref(UserCollectionDto)

export type UserCollectionDtoType = Static<typeof UserCollectionDto>