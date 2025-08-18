/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItemCompatibility } from './CartItemCompatibility';
export type CartUpdateCompatibilityRequest = {
    cartId: string;
    customerId: string;
    cartName?: string | null;
    cartDescription?: string | null;
    cartItems?: Array<CartItemCompatibility> | null;
    currencyCode?: string | null;
    metadata?: Record<string, string> | null;
};

