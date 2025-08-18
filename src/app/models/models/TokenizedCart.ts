/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenizedCartItem } from './TokenizedCartItem';
export type TokenizedCart = {
    id?: string;
    userId?: string;
    name?: string;
    description?: string;
    items?: Array<TokenizedCartItem>;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    expiresAt?: string | null;
    totalValue?: number;
    currency?: string;
};

