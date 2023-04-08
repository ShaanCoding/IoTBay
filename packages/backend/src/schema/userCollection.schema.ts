import { Static, Type } from '@sinclair/typebox'
import { UserSchema, UserSchemaRef } from './user.schema'

export const UserCollectionSchema = Type.Array(UserSchemaRef, {
    description: 'UserCollectionDto',
    $id: 'UserCollectionDto',
    // $ref: 'UserCollectionDto',
})

export const UserCollectionSchemaRef = Type.Ref(UserCollectionSchema)

export type UserCollectionSchemaType = Static<typeof UserCollectionSchema>