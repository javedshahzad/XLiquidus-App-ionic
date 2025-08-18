/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import type { UpdateUserRequest } from '../models/UpdateUserRequest';
import type { UserDetails } from '../models/UserDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsUserManagementService {
    /**
     * @returns UserDetails OK
     * @throws ApiError
     */
    public static getApiUsers({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns UserDetails OK
     * @throws ApiError
     */
    public static putApiUsers({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: UpdateUserRequest,
    }): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserDetails OK
     * @throws ApiError
     */
    public static getApiUsersMe(): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me',
        });
    }
    /**
     * @returns UserDetails OK
     * @throws ApiError
     */
    public static putApiUsersMe({
        requestBody,
    }: {
        requestBody: UpdateUserRequest,
    }): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiUsersChangePassword({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: ChangePasswordRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/{userId}/change-password',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiUsersMeChangePassword({
        requestBody,
    }: {
        requestBody: ChangePasswordRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/me/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
