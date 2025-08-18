/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDeviceRegistrationRequest } from '../models/UserDeviceRegistrationRequest';
import type { UserDeviceRegistrationResponse } from '../models/UserDeviceRegistrationResponse';
import type { UserDeviceSynchronizationRequest } from '../models/UserDeviceSynchronizationRequest';
import type { UserDeviceSynchronizationResponse } from '../models/UserDeviceSynchronizationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsUsersService {
    /**
     * @returns UserDeviceRegistrationResponse OK
     * @throws ApiError
     */
    public static postLegacyUsersRegisterDeviceAsync({
        requestBody,
    }: {
        requestBody: UserDeviceRegistrationRequest,
    }): CancelablePromise<UserDeviceRegistrationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/RegisterDeviceAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserDeviceSynchronizationResponse OK
     * @throws ApiError
     */
    public static postLegacyUsersSynchronizeDeviceAsync({
        requestBody,
    }: {
        requestBody: UserDeviceSynchronizationRequest,
    }): CancelablePromise<UserDeviceSynchronizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/SynchronizeDeviceAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersLiteMobileRegistration({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/LiteMobileRegistration',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersPostSync({
        requestBody,
        clientIpAddress,
    }: {
        requestBody: any,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/PostSync',
            query: {
                'clientIpAddress': clientIpAddress,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyUsersGetUser({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Users/GetUser',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersUpdateUser({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/UpdateUser',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersAcceptedTerms({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/AcceptedTerms',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersRegisterMfa({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/RegisterMfa',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersVerifyMfaCode({
        emailAddress,
        clientIpAddress,
        code,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
        code?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/VerifyMFACode',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
                'code': code,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyUsersGetRequestResetPassword({
        email,
        ipAddress,
        deviceId,
        appInterfaceId,
    }: {
        email?: string,
        ipAddress?: string,
        deviceId?: string,
        appInterfaceId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Users/GetRequestResetPassword',
            query: {
                'email': email,
                'ipAddress': ipAddress,
                'deviceId': deviceId,
                'appInterfaceId': appInterfaceId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersGeneratePaymentRequestByCheckoutId({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/GeneratePaymentRequestByCheckoutId',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyUsersGenerateCryptoCharge({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Users/GenerateCryptoCharge',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
            },
        });
    }
}
