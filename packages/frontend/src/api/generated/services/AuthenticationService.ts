/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginSchema } from '../models/LoginSchema';
import type { RegisterSchema } from '../models/RegisterSchema';
import type { UserSchema } from '../models/UserSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthenticationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody
     * @returns UserSchema Default Response
     * @throws ApiError
     */
    public login(
        requestBody?: LoginSchema,
    ): CancelablePromise<UserSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public logout(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/logout',
        });
    }

    /**
     * @param requestBody
     * @returns UserSchema Default Response
     * @throws ApiError
     */
    public register(
        requestBody?: RegisterSchema,
    ): CancelablePromise<UserSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
