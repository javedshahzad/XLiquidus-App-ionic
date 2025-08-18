/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressCompatibility } from './AddressCompatibility';
export type CartCheckoutCompatibilityRequest = {
    cartId: string;
    customerId: string;
    paymentMethodId?: string | null;
    paymentMethodType?: string | null;
    billingAddress?: AddressCompatibility;
    shippingAddress?: AddressCompatibility;
    useSameAddressForBillingAndShipping?: boolean;
    shippingMethod?: string | null;
    shippingCost?: number | null;
    discountCode?: string | null;
    notes?: string | null;
    metadata?: Record<string, string> | null;
};

