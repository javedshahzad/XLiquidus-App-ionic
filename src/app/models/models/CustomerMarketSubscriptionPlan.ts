/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerMarketSubscriptionPlan = {
    id?: string;
    marketId?: string;
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    durationDays?: number;
    features?: Array<string>;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    isFeatured?: boolean;
    sortOrder?: number;
    maxTradingPairs?: number | null;
    maxAlerts?: number | null;
    includesRealTimeData?: boolean;
    includesAdvancedAnalytics?: boolean;
    includesApiAccess?: boolean;
};

