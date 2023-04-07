/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCollectionDto } from '../models/UserCollectionDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns UserDto Default Response
     * @throws ApiError
     */
    public getMe(): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/me',
        });
    }

    /**
     * @param userId 
     * @returns UserDto Default Response
     * @throws ApiError
     */
    public getUser(
userId: string,
): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * @returns UserCollectionDto Default Response
     * @throws ApiError
     */
    public getUsers(): CancelablePromise<UserCollectionDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users',
        });
    }

}
