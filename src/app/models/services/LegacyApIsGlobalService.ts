/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsGlobalService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyGlobalGetCountries({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Global/GetCountries',
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
    public static getLegacyGlobalGetLanguages({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Global/GetLanguages',
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
    public static getLegacyGlobalGetCryptoCurrencies({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Global/GetCryptoCurrencies',
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
    public static getLegacyGlobalGetUserLimits({
        emailAddress,
    }: {
        emailAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Global/GetUserLimits',
            query: {
                'emailAddress': emailAddress,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyGlobalGetGenders({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Global/GetGenders',
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
    public static getLegacyGlobalGetPaymentSourceTypes({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Global/GetPaymentSourceTypes',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
            },
        });
    }
}
