/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartCheckoutRequest } from '../models/CartCheckoutRequest';
import type { CartCreationRequest } from '../models/CartCreationRequest';
import type { CartItemRequest } from '../models/CartItemRequest';
import type { CartResponse } from '../models/CartResponse';
import type { CartUpdateRequest } from '../models/CartUpdateRequest';
import type { TokenizedCart } from '../models/TokenizedCart';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsTokenizedCartService {
    /**
     * @returns TokenizedCart OK
     * @throws ApiError
     */
    public static getApiTokenizedCarts(): CancelablePromise<Array<TokenizedCart>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tokenized-carts',
        });
    }
    /**
     * @returns CartResponse Created
     * @throws ApiError
     */
    public static postApiTokenizedCarts({
        requestBody,
    }: {
        requestBody: CartCreationRequest,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tokenized-carts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TokenizedCart OK
     * @throws ApiError
     */
    public static getApiTokenizedCarts1({
        cartId,
    }: {
        cartId: string,
    }): CancelablePromise<TokenizedCart> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tokenized-carts/{cartId}',
            path: {
                'cartId': cartId,
            },
        });
    }
    /**
     * @returns CartResponse OK
     * @throws ApiError
     */
    public static putApiTokenizedCarts({
        cartId,
        requestBody,
    }: {
        cartId: string,
        requestBody: CartUpdateRequest,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tokenized-carts/{cartId}',
            path: {
                'cartId': cartId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CartResponse OK
     * @throws ApiError
     */
    public static deleteApiTokenizedCarts({
        cartId,
    }: {
        cartId: string,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tokenized-carts/{cartId}',
            path: {
                'cartId': cartId,
            },
        });
    }
    /**
     * @returns CartResponse OK
     * @throws ApiError
     */
    public static postApiTokenizedCartsItems({
        cartId,
        requestBody,
    }: {
        cartId: string,
        requestBody: CartItemRequest,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tokenized-carts/{cartId}/items',
            path: {
                'cartId': cartId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CartResponse OK
     * @throws ApiError
     */
    public static deleteApiTokenizedCartsItems({
        cartId,
        itemId,
    }: {
        cartId: string,
        itemId: string,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tokenized-carts/{cartId}/items/{itemId}',
            path: {
                'cartId': cartId,
                'itemId': itemId,
            },
        });
    }
    /**
     * @returns CartResponse OK
     * @throws ApiError
     */
    public static postApiTokenizedCartsCheckout({
        cartId,
        requestBody,
    }: {
        cartId: string,
        requestBody: CartCheckoutRequest,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tokenized-carts/{cartId}/checkout',
            path: {
                'cartId': cartId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
