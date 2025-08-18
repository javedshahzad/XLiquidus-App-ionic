/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerMarketItem = {
    customerMarketId?: string;
    marketId?: string;
    marketName?: string;
    description?: string;
    marketType?: string;
    baseCurrencyCode?: string;
    quoteCurrencyCode?: string;
    status?: string;
    currentPrice?: number;
    high24h?: number;
    low24h?: number;
    volume24h?: number;
    priceChangePercentage24h?: number;
    marketCap?: number;
    tradingPairs?: Array<string>;
    isFavorite?: boolean;
    subscriptionId?: string | null;
    subscriptionPlanId?: string | null;
    subscriptionPlanName?: string | null;
    subscriptionStatus?: string | null;
    subscriptionStartDate?: string | null;
    subscriptionEndDate?: string | null;
    createdDate?: string;
    lastUpdatedDate?: string;
};

