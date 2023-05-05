/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCollectionSchema } from '../models/UserCollectionSchema';
import type { UserSchema } from '../models/UserSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns UserSchema Default Response
     * @throws ApiError
     */
    public getMe(): CancelablePromise<UserSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/me',
        });
    }

    /**
     * @param userId
     * @returns UserSchema Default Response
     * @throws ApiError
     */
    public getUser(
        userId: string,
    ): CancelablePromise<UserSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * @returns UserCollectionSchema Default Response
     * @throws ApiError
     */
    public getUsers(): CancelablePromise<UserCollectionSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users',
        });
    }

}
