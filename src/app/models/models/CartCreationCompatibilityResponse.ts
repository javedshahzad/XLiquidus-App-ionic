/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItemCompatibilityResponse } from './CartItemCompatibilityResponse';
export type CartCreationCompatibilityResponse = {
    isSuccessful?: boolean;
    message?: string;
    cartId?: string;
    customerId?: string;
    cartName?: string | null;
    cartDescription?: string | null;
    cartItems?: Array<CartItemCompatibilityResponse>;
    subtotal?: number;
    tax?: number;
    total?: number;
    currencyCode?: string | null;
    status?: string;
    metadata?: Record<string, string> | null;
    createdDate?: string;
    lastUpdatedDate?: string;
    expirationDate?: string | null;
};

