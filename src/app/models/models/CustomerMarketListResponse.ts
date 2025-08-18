/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerMarketItem } from './CustomerMarketItem';
export type CustomerMarketListResponse = {
    isSuccessful?: boolean;
    message?: string;
    customerId?: string;
    customerMarkets?: Array<CustomerMarketItem>;
    totalCount?: number;
    pageNumber?: number;
    pageSize?: number;
    timestamp?: string;
};

