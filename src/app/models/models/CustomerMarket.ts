/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerTradingPair } from './CustomerTradingPair';
export type CustomerMarket = {
    id?: string;
    customerId?: string;
    marketId?: string;
    marketName?: string;
    marketDescription?: string | null;
    logoUrl?: string | null;
    status?: string;
    type?: string;
    category?: string;
    tags?: Array<string>;
    createdAt?: string;
    updatedAt?: string;
    isFavorite?: boolean;
    isSubscribed?: boolean;
    subscriptionExpiresAt?: string | null;
    tradingPairs?: Array<CustomerTradingPair>;
    marketType?: string | null;
    baseCurrencyCode?: string;
};

