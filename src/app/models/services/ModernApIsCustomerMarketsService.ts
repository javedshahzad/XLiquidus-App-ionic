/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerMarket } from '../models/CustomerMarket';
import type { CustomerMarketSubscription } from '../models/CustomerMarketSubscription';
import type { CustomerMarketSubscriptionPlan } from '../models/CustomerMarketSubscriptionPlan';
import type { CustomerTradingPair } from '../models/CustomerTradingPair';
import type { CustomerTradingPairAlert } from '../models/CustomerTradingPairAlert';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsCustomerMarketsService {
    /**
     * @returns CustomerMarket OK
     * @throws ApiError
     */
    public static getApiCustomerMarkets(): CancelablePromise<Array<CustomerMarket>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets',
        });
    }
    /**
     * @returns CustomerMarket OK
     * @throws ApiError
     */
    public static getApiCustomerMarkets1({
        marketId,
    }: {
        marketId: string,
    }): CancelablePromise<CustomerMarket> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/{marketId}',
            path: {
                'marketId': marketId,
            },
        });
    }
    /**
     * @returns CustomerTradingPair OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsTradingPairs({
        marketId,
    }: {
        marketId: string,
    }): CancelablePromise<Array<CustomerTradingPair>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/{marketId}/trading-pairs',
            path: {
                'marketId': marketId,
            },
        });
    }
    /**
     * @returns CustomerTradingPair OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsTradingPairs1({
        symbol,
    }: {
        symbol: string,
    }): CancelablePromise<CustomerTradingPair> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/trading-pairs/{symbol}',
            path: {
                'symbol': symbol,
            },
        });
    }
    /**
     * @returns CustomerTradingPairAlert OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsTradingPairsAlerts({
        tradingPairId,
    }: {
        tradingPairId: string,
    }): CancelablePromise<Array<CustomerTradingPairAlert>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/trading-pairs/{tradingPairId}/alerts',
            path: {
                'tradingPairId': tradingPairId,
            },
        });
    }
    /**
     * @returns CustomerTradingPairAlert OK
     * @throws ApiError
     */
    public static postApiCustomerMarketsTradingPairsAlerts({
        tradingPairId,
        requestBody,
    }: {
        tradingPairId: string,
        requestBody: CustomerTradingPairAlert,
    }): CancelablePromise<CustomerTradingPairAlert> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/customer-markets/trading-pairs/{tradingPairId}/alerts',
            path: {
                'tradingPairId': tradingPairId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CustomerTradingPairAlert OK
     * @throws ApiError
     */
    public static putApiCustomerMarketsTradingPairsAlerts({
        tradingPairId,
        alertId,
        requestBody,
    }: {
        tradingPairId: string,
        alertId: string,
        requestBody: CustomerTradingPairAlert,
    }): CancelablePromise<CustomerTradingPairAlert> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/customer-markets/trading-pairs/{tradingPairId}/alerts/{alertId}',
            path: {
                'tradingPairId': tradingPairId,
                'alertId': alertId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiCustomerMarketsTradingPairsAlerts({
        tradingPairId,
        alertId,
    }: {
        tradingPairId: string,
        alertId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/customer-markets/trading-pairs/{tradingPairId}/alerts/{alertId}',
            path: {
                'tradingPairId': tradingPairId,
                'alertId': alertId,
            },
        });
    }
    /**
     * @returns CustomerMarketSubscription OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsSubscriptions(): CancelablePromise<Array<CustomerMarketSubscription>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/subscriptions',
        });
    }
    /**
     * @returns CustomerMarketSubscription OK
     * @throws ApiError
     */
    public static postApiCustomerMarketsSubscriptions({
        requestBody,
    }: {
        requestBody: CustomerMarketSubscription,
    }): CancelablePromise<CustomerMarketSubscription> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/customer-markets/subscriptions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CustomerMarketSubscription OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsSubscriptions1({
        subscriptionId,
    }: {
        subscriptionId: string,
    }): CancelablePromise<CustomerMarketSubscription> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/subscriptions/{subscriptionId}',
            path: {
                'subscriptionId': subscriptionId,
            },
        });
    }
    /**
     * @returns CustomerMarketSubscriptionPlan OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsMarketsSubscriptionPlans({
        marketId,
    }: {
        marketId: string,
    }): CancelablePromise<Array<CustomerMarketSubscriptionPlan>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/markets/{marketId}/subscription-plans',
            path: {
                'marketId': marketId,
            },
        });
    }
    /**
     * @returns CustomerMarketSubscriptionPlan OK
     * @throws ApiError
     */
    public static getApiCustomerMarketsMarketsSubscriptionPlans1({
        marketId,
        planId,
    }: {
        marketId: string,
        planId: string,
    }): CancelablePromise<CustomerMarketSubscriptionPlan> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customer-markets/markets/{marketId}/subscription-plans/{planId}',
            path: {
                'marketId': marketId,
                'planId': planId,
            },
        });
    }
    /**
     * @returns CustomerMarketSubscription OK
     * @throws ApiError
     */
    public static putApiCustomerMarketsSubscriptionsCancel({
        subscriptionId,
        requestBody,
    }: {
        subscriptionId: string,
        requestBody: string,
    }): CancelablePromise<CustomerMarketSubscription> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/customer-markets/subscriptions/{subscriptionId}/cancel',
            path: {
                'subscriptionId': subscriptionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
