/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerTradingPairItem } from './CustomerTradingPairItem';
export type CustomerTradingPairResponse = {
    isSuccessful?: boolean;
    message?: string;
    customerId?: string;
    customerMarketId?: string;
    customerTradingPairs?: Array<CustomerTradingPairItem>;
    totalCount?: number;
    pageNumber?: number;
    pageSize?: number;
    timestamp?: string;
};

