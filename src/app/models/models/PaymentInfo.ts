/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { PaymentMethod } from './PaymentMethod';
export type PaymentInfo = {
    id?: string;
    paymentMethod?: PaymentMethod;
    fiatCardPaymentId?: string;
    cryptoPaymentId?: string;
    walletPaymentId?: string | null;
    currency?: CloudCheckoutCurrency;
    totalAmount?: number;
};

