/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerMarketSubscription = {
    id?: string;
    customerId?: string;
    marketId?: string;
    subscriptionPlanId?: string;
    subscriptionPlanName?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    renewalDate?: string | null;
    autoRenew?: boolean;
    price?: number;
    currency?: string;
    paymentMethod?: string;
    paymentStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    cancelledAt?: string | null;
    cancellationReason?: string | null;
};

