/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { ExchangeRateVendor } from './ExchangeRateVendor';
import type { MarketAsset } from './MarketAsset';
export type LedgerMarketExchangeRate = {
    id?: string;
    baseCurrency?: CloudCheckoutCurrency;
    asset?: MarketAsset;
    exchangeRate?: number;
    date?: string;
    vendor?: ExchangeRateVendor;
    quoteId?: string | null;
    usdValue?: number;
};

