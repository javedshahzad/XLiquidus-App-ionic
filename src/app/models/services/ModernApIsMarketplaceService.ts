/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateListingRequest } from '../models/CreateListingRequest';
import type { MarketplaceSearchRequest } from '../models/MarketplaceSearchRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsMarketplaceService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiMarketplaceProducts({
        page = 1,
        pageSize = 20,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/marketplace/products',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiMarketplaceMyListings(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/marketplace/my-listings',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiMarketplaceListings({
        requestBody,
    }: {
        requestBody: CreateListingRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/marketplace/listings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiMarketplaceListings({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/marketplace/listings/{listingId}',
            path: {
                'listingId': listingId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiMarketplaceSearch({
        requestBody,
    }: {
        requestBody: MarketplaceSearchRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/marketplace/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
