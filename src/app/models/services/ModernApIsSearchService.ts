/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResponse } from '../models/SearchResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsSearchService {
    /**
     * @returns SearchResponse OK
     * @throws ApiError
     */
    public static getApiSearch({
        query,
        category = null,
        page = 1,
        pageSize = 20,
        sortBy = null,
        sortDirection = null,
    }: {
        query?: string,
        category?: string,
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortDirection?: string,
    }): CancelablePromise<SearchResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Search',
            query: {
                'query': query,
                'category': category,
                'page': page,
                'pageSize': pageSize,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiSearchSuggestions({
        query,
        category = null,
        limit = 10,
    }: {
        query?: string,
        category?: string,
        limit?: number,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Search/suggestions',
            query: {
                'query': query,
                'category': category,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getApiSearchCategories(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Search/categories',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
}
