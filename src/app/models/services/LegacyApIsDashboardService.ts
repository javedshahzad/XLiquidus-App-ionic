/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsDashboardService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyDashboardGetGetHistoricalWalletBalance({
        emailAddress,
        clientIpAddress,
        days = 30,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
        days?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Dashboard/GetGetHistoricalWalletBalance',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
                'days': days,
            },
        });
    }
}
