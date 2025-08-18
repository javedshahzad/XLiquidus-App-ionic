/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsWaitingListService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyWaitingListAddToWaitingList({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/WaitingList/AddToWaitingList',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyWaitingListGetWaitingList({
        email,
        applicationType,
    }: {
        email: string,
        applicationType: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/WaitingList/GetWaitingList/{email}/{applicationType}',
            path: {
                'email': email,
                'applicationType': applicationType,
            },
        });
    }
}
