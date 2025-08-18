/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsShoppingCartService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyShoppingCartUpdateRequestedPaymentTypeByCheckoutId({
        emailAddress,
        clientIpAddress,
        checkoutId,
        paymentType = 'crypto',
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
        checkoutId?: string,
        paymentType?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/ShoppingCart/UpdateRequestedPaymentTypeByCheckoutId',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
                'checkoutId': checkoutId,
                'paymentType': paymentType,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyShoppingCartPostCompleteCheckout({
        emailAddress,
        clientIpAddress,
        cartId,
        cartType,
        authCode,
    }: {
        emailAddress?: string,
        clientIpAddress?: string,
        cartId?: string,
        cartType?: string,
        authCode?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/ShoppingCart/PostCompleteCheckout',
            query: {
                'emailAddress': emailAddress,
                'clientIpAddress': clientIpAddress,
                'cartId': cartId,
                'cartType': cartType,
                'authCode': authCode,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLegacyShoppingCartCancelPendingSaleByCheckoutId({
        emailAddress,
        useForceCancel,
        checkoutCode,
    }: {
        emailAddress?: string,
        useForceCancel?: boolean,
        checkoutCode?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/ShoppingCart/CancelPendingSaleByCheckoutId',
            query: {
                'emailAddress': emailAddress,
                'useForceCancel': useForceCancel,
                'checkoutCode': checkoutCode,
            },
        });
    }
}
