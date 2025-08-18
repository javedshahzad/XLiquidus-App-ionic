/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsCloudCartService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyCloudCartGetCart({
        email,
        cartType,
    }: {
        email?: string,
        cartType?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/CloudCart/GetCart',
            query: {
                'email': email,
                'cartType': cartType,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyCloudCartCreateCart({
        email,
        cartType,
    }: {
        email?: string,
        cartType?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CloudCart/CreateCart',
            query: {
                'email': email,
                'cartType': cartType,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyCloudCartAddToCart({
        requestBody,
        email,
        cartType,
    }: {
        requestBody: any,
        email?: string,
        cartType?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CloudCart/AddToCart',
            query: {
                'email': email,
                'cartType': cartType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putLegacyCloudCartUpdateCart({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/legacy/CloudCart/UpdateCart',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyCloudCartRemoveFromCart({
        email,
        cartType,
        item,
    }: {
        email?: string,
        cartType?: string,
        item?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CloudCart/RemoveFromCart',
            query: {
                'email': email,
                'cartType': cartType,
                'item': item,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLegacyCloudCartGetCartItemCount({
        email,
        cartType,
    }: {
        email?: string,
        cartType?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/legacy/CloudCart/GetCartItemCount',
            query: {
                'email': email,
                'cartType': cartType,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyCloudCartGetCheckoutCode({
        email,
        cartType,
        type,
    }: {
        email?: string,
        cartType?: string,
        type?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CloudCart/GetCheckoutCode',
            query: {
                'email': email,
                'cartType': cartType,
                'type': type,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyCloudCartPostCheckout({
        requestBody,
    }: {
        requestBody: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CloudCart/PostCheckout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
