/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsSearchService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacySearchGet({
        emailAddress,
        clientIpAddress,
        searchRequest,
        lang,
        take,
        skip,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
        searchRequest?: string,
        lang?: string,
        take?: number,
        skip?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Search/Get',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
                'searchRequest': searchRequest,
                'lang': lang,
                'take': take,
                'skip': skip,
            },
        });
    }
}
