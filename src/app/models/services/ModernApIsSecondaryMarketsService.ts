/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListingSale } from '../models/ListingSale';
import type { MarketListing } from '../models/MarketListing';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsSecondaryMarketsService {
    /**
     * @returns MarketListing OK
     * @throws ApiError
     */
    public static getApiSecondaryMarketsListings(): CancelablePromise<Array<MarketListing>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secondary-markets/listings',
        });
    }
    /**
     * @returns MarketListing OK
     * @throws ApiError
     */
    public static postApiSecondaryMarketsListings({
        requestBody,
    }: {
        requestBody: MarketListing,
    }): CancelablePromise<MarketListing> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secondary-markets/listings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MarketListing OK
     * @throws ApiError
     */
    public static getApiSecondaryMarketsListings1({
        id,
    }: {
        id: string,
    }): CancelablePromise<MarketListing> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secondary-markets/listings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns MarketListing OK
     * @throws ApiError
     */
    public static putApiSecondaryMarketsListings({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: MarketListing,
    }): CancelablePromise<MarketListing> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/secondary-markets/listings/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiSecondaryMarketsListings({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/secondary-markets/listings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ListingSale OK
     * @throws ApiError
     */
    public static getApiSecondaryMarketsSales(): CancelablePromise<Array<ListingSale>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secondary-markets/sales',
        });
    }
    /**
     * @returns ListingSale OK
     * @throws ApiError
     */
    public static postApiSecondaryMarketsSales({
        requestBody,
    }: {
        requestBody: ListingSale,
    }): CancelablePromise<ListingSale> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secondary-markets/sales',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ListingSale OK
     * @throws ApiError
     */
    public static getApiSecondaryMarketsSales1({
        id,
    }: {
        id: string,
    }): CancelablePromise<ListingSale> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secondary-markets/sales/{id}',
            path: {
                'id': id,
            },
        });
    }
}
