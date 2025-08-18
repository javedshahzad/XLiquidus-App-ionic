/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { FeeType } from './FeeType';
export type CloudFee = {
    id?: string;
    amount?: number;
    type?: FeeType;
    currency?: CloudCheckoutCurrency;
    description?: string | null;
};

