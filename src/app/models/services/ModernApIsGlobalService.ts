/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppConfig } from '../models/AppConfig';
import type { LimitResponse } from '../models/LimitResponse';
import type { SystemStatus } from '../models/SystemStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsGlobalService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetGenders(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetGenders',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetLanguages(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetLanguages',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetCryptoCurrencies(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetCryptoCurrencies',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetSearchTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetSearchTypes',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetSearchLanguageTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetSearchLanguageTypes',
        });
    }
    /**
     * @returns LimitResponse OK
     * @throws ApiError
     */
    public static getApiGlobalGetUserLimits(): CancelablePromise<LimitResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetUserLimits',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetUserLevels(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetUserLevels',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetLimitTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetLimitTypes',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetLimitFrequencies(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetLimitFrequencies',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetPaymentSources(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetPaymentSources',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetBankAccountTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetBankAccountTypes',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetQuickActionCartTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetQuickActionCartTypes',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetQuickActionServiceTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetQuickActionServiceTypes',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetFundingOptions(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetFundingOptions',
        });
    }
    /**
     * @returns SystemStatus OK
     * @throws ApiError
     */
    public static getApiGlobalGetSystemStatus(): CancelablePromise<SystemStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetSystemStatus',
        });
    }
    /**
     * @returns AppConfig OK
     * @throws ApiError
     */
    public static getApiGlobalGetAppConfig(): CancelablePromise<AppConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetAppConfig',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiGlobalGetAppVersion(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/global/GetAppVersion',
        });
    }
}
