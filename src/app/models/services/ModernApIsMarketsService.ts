/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Market } from '../models/Market';
import type { PriceTier } from '../models/PriceTier';
import type { Trade } from '../models/Trade';
import type { TradingPair } from '../models/TradingPair';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsMarketsService {
    /**
     * @returns Market OK
     * @throws ApiError
     */
    public static getApiMarkets(): CancelablePromise<Array<Market>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markets',
        });
    }
    /**
     * @returns Market OK
     * @throws ApiError
     */
    public static getApiMarkets1({
        marketId,
    }: {
        marketId: string,
    }): CancelablePromise<Market> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markets/{marketId}',
            path: {
                'marketId': marketId,
            },
        });
    }
    /**
     * @returns TradingPair OK
     * @throws ApiError
     */
    public static getApiMarketsTradingPairs({
        marketId,
    }: {
        marketId: string,
    }): CancelablePromise<Array<TradingPair>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markets/{marketId}/trading-pairs',
            path: {
                'marketId': marketId,
            },
        });
    }
    /**
     * @returns TradingPair OK
     * @throws ApiError
     */
    public static getApiMarketsTradingPairs1({
        symbol,
    }: {
        symbol: string,
    }): CancelablePromise<TradingPair> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markets/trading-pairs/{symbol}',
            path: {
                'symbol': symbol,
            },
        });
    }
    /**
     * @returns Trade OK
     * @throws ApiError
     */
    public static getApiMarketsTradingPairsTrades({
        symbol,
        limit = 50,
    }: {
        symbol: string,
        limit?: number,
    }): CancelablePromise<Array<Trade>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markets/trading-pairs/{symbol}/trades',
            path: {
                'symbol': symbol,
            },
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * @returns PriceTier OK
     * @throws ApiError
     */
    public static getApiMarketsPriceTiers({
        marketId,
    }: {
        marketId: string,
    }): CancelablePromise<Array<PriceTier>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markets/{marketId}/price-tiers',
            path: {
                'marketId': marketId,
            },
        });
    }
}
