/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthenticationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns UserDto Default Response
     * @throws ApiError
     */
    public login(
requestBody?: LoginDto,
): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns UserDto Default Response
     * @throws ApiError
     */
    public register(
requestBody?: RegisterDto,
): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/register',
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

}
