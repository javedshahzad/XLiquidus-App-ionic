/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerMarketListRequest } from '../models/CustomerMarketListRequest';
import type { CustomerMarketListResponse } from '../models/CustomerMarketListResponse';
import type { CustomerTradingPairRequest } from '../models/CustomerTradingPairRequest';
import type { CustomerTradingPairResponse } from '../models/CustomerTradingPairResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LegacyApIsCustomerMarketsService {
    /**
     * @returns CustomerMarketListResponse OK
     * @throws ApiError
     */
    public static postLegacyCustomerMarketsGetCustomerMarketListAsync({
        requestBody,
    }: {
        requestBody: CustomerMarketListRequest,
    }): CancelablePromise<CustomerMarketListResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CustomerMarkets/GetCustomerMarketListAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CustomerTradingPairResponse OK
     * @throws ApiError
     */
    public static postLegacyCustomerMarketsGetCustomerTradingPairsAsync({
        requestBody,
    }: {
        requestBody: CustomerTradingPairRequest,
    }): CancelablePromise<CustomerTradingPairResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/legacy/CustomerMarkets/GetCustomerTradingPairsAsync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
