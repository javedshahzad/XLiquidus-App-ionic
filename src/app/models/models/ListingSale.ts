/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { LedgerMarketExchangeRate } from './LedgerMarketExchangeRate';
export type ListingSale = {
    id?: string;
    listingId?: string;
    customerId?: string;
    transactionSetId?: string;
    blockReference?: string | null;
    asset?: CloudCheckoutCurrency;
    exchangeRate?: LedgerMarketExchangeRate;
    quantity?: number;
    price?: number;
    totalPrice?: number;
    totalFees?: number;
};

