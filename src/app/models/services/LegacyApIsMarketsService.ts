/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsMarketsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyMarketsGetProduct({
        emailAddress,
        clientIpAddress,
        symbol,
        name,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
        symbol?: string,
        name?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Markets/GetProduct',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
                'symbol': symbol,
                'name': name,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyMarketsGetProductStats({
        symbol,
        name,
        skip,
        take,
        from,
        to,
    }: {
        symbol?: string,
        name?: string,
        skip?: number,
        take?: number,
        from?: string,
        to?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Markets/GetProductStats',
            query: {
                'symbol': symbol,
                'name': name,
                'skip': skip,
                'take': take,
                'from': from,
                'to': to,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyMarketsPostMarketSearch({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Markets/PostMarketSearch',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyMarketsPostCreateListing({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Markets/PostCreateListing',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyMarketsGetListingById({
        listingId,
        emailAddress,
        clientIpAddress,
    }: {
        listingId?: string,
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Markets/GetListingById',
            query: {
                'listingId': listingId,
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyMarketsGetCurrentMarketProfile({
        emailAddress,
        clientIpAddress,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/Markets/GetCurrentMarketProfile',
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
    public static postLegacyMarketsPostCreateMarketProfile({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/Markets/PostCreateMarketProfile',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
