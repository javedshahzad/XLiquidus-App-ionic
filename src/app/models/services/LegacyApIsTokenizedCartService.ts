/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartCheckoutCompatibilityRequest } from '../models/CartCheckoutCompatibilityRequest';
import type { CartCheckoutCompatibilityResponse } from '../models/CartCheckoutCompatibilityResponse';
import type { CartCreationCompatibilityRequest } from '../models/CartCreationCompatibilityRequest';
import type { CartCreationCompatibilityResponse } from '../models/CartCreationCompatibilityResponse';
import type { CartUpdateCompatibilityRequest } from '../models/CartUpdateCompatibilityRequest';
import type { CartUpdateCompatibilityResponse } from '../models/CartUpdateCompatibilityResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsTokenizedCartService {
    /**
     * @returns CartCreationCompatibilityResponse OK
     * @throws ApiError
     */
    public static postLegacyTokenizedCartCreateCartAsync({
        requestBody,
    }: {
        requestBody: CartCreationCompatibilityRequest,
    }): CancelablePromise<CartCreationCompatibilityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/TokenizedCart/CreateCartAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CartUpdateCompatibilityResponse OK
     * @throws ApiError
     */
    public static postLegacyTokenizedCartUpdateCartAsync({
        requestBody,
    }: {
        requestBody: CartUpdateCompatibilityRequest,
    }): CancelablePromise<CartUpdateCompatibilityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/TokenizedCart/UpdateCartAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CartCheckoutCompatibilityResponse OK
     * @throws ApiError
     */
    public static postLegacyTokenizedCartCheckoutCartAsync({
        requestBody,
    }: {
        requestBody: CartCheckoutCompatibilityRequest,
    }): CancelablePromise<CartCheckoutCompatibilityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/TokenizedCart/CheckoutCartAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
