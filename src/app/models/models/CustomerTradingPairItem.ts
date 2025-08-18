/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerTradingPairItem = {
    customerTradingPairId?: string;
    tradingPairId?: string;
    symbol?: string;
    baseCurrencyCode?: string;
    quoteCurrencyCode?: string;
    status?: string;
    currentPrice?: number;
    high24h?: number;
    low24h?: number;
    volume24h?: number;
    priceChangePercentage24h?: number;
    minOrderSize?: number;
    maxOrderSize?: number;
    pricePrecision?: number;
    quantityPrecision?: number;
    isFavorite?: boolean;
    alertId?: string | null;
    alertPrice?: number | null;
    alertCondition?: string | null;
    alertStatus?: string | null;
    createdDate?: string;
    lastUpdatedDate?: string;
};

