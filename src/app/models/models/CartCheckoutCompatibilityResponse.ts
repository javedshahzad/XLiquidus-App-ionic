/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressCompatibility } from './AddressCompatibility';
import type { CartItemCompatibilityResponse } from './CartItemCompatibilityResponse';
export type CartCheckoutCompatibilityResponse = {
    isSuccessful?: boolean;
    message?: string;
    orderId?: string;
    cartId?: string;
    customerId?: string;
    paymentId?: string | null;
    paymentStatus?: string | null;
    paymentMethodId?: string | null;
    paymentMethodType?: string | null;
    billingAddress?: AddressCompatibility;
    shippingAddress?: AddressCompatibility;
    shippingMethod?: string | null;
    shippingCost?: number | null;
    discountCode?: string | null;
    discountAmount?: number | null;
    subtotal?: number;
    tax?: number;
    total?: number;
    currencyCode?: string | null;
    orderStatus?: string;
    notes?: string | null;
    metadata?: Record<string, string> | null;
    createdDate?: string;
    lastUpdatedDate?: string;
    cartItems?: Array<CartItemCompatibilityResponse>;
};

