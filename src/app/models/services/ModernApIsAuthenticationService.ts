/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { LoginResponse } from '../models/LoginResponse';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { SignupRequest } from '../models/SignupRequest';
import type { SignupResponse } from '../models/SignupResponse';
import type { UserProfile } from '../models/UserProfile';
import type { ValidateTokenRequest } from '../models/ValidateTokenRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsAuthenticationService {
    /**
     * @returns LoginResponse OK
     * @throws ApiError
     */
    public static postApiAuthLogin({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LoginResponse OK
     * @throws ApiError
     */
    public static postApiAuthRefresh({
        requestBody,
    }: {
        requestBody: RefreshTokenRequest,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserProfile OK
     * @throws ApiError
     */
    public static getApiAuthUsers({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns UserProfile OK
     * @throws ApiError
     */
    public static getApiAuthMe(): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/me',
        });
    }
    /**
     * @returns SignupResponse OK
     * @throws ApiError
     */
    public static postApiAuthRegister({
        requestBody,
    }: {
        requestBody: SignupRequest,
    }): CancelablePromise<SignupResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiAuthPublic(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/public',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiAuthProtected(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/protected',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAuthTokenValidate({
        requestBody,
    }: {
        requestBody: ValidateTokenRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/token/validate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiAuthUserProfile(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/user/profile',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAuthUserSync(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/user/sync',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAuthLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiAuthStatus(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/status',
        });
    }
}
