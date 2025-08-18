/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerTradingPairAlert } from './CustomerTradingPairAlert';
export type CustomerTradingPair = {
    id?: string;
    customerId?: string;
    tradingPairId?: string;
    symbol?: string;
    baseAsset?: string;
    quoteAsset?: string;
    status?: string;
    minOrderSize?: number;
    maxOrderSize?: number;
    pricePrecision?: number;
    quantityPrecision?: number;
    baseAssetPrecision?: number;
    quoteAssetPrecision?: number;
    tradingFee?: number;
    isFavorite?: boolean;
    alerts?: Array<CustomerTradingPairAlert>;
    createdAt?: string;
    updatedAt?: string;
    customerMarketId?: string;
    baseCurrencyCode?: string | null;
    quoteCurrencyCode?: string;
    currentPrice?: number;
    alert?: any;
};

