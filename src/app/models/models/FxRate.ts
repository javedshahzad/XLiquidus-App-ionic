/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
export type FxRate = {
    id?: string;
    baseCurrency?: CloudCheckoutCurrency;
    payoutCurrency?: CloudCheckoutCurrency;
    rate?: number;
    quoteId?: string;
    baseExchangeRate?: number;
    payoutExchangeRate?: number;
};

