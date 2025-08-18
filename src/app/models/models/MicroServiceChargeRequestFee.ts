/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { FeeType } from './FeeType';
import type { NullableOfCloudCartType } from './NullableOfCloudCartType';
export type MicroServiceChargeRequestFee = {
    id?: string;
    amount?: number;
    description?: string | null;
    cartType?: NullableOfCloudCartType;
    currency?: CloudCheckoutCurrency;
    type?: FeeType;
};

