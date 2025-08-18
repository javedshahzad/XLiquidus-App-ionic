/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
export type PaymentAddress = {
    id?: string;
    address?: string | null;
    type?: CloudCheckoutCurrency;
    expectedCryptoAmount?: number;
    rate?: number;
    addressAsQrCode?: string | null;
};

