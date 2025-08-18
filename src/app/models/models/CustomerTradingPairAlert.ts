/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerTradingPairAlert = {
    id?: string;
    customerId?: string;
    tradingPairId?: string;
    alertType?: string;
    condition?: string;
    value?: number;
    status?: string;
    notificationMethod?: string;
    notificationDestination?: string;
    createdAt?: string;
    updatedAt?: string;
    lastTriggeredAt?: string | null;
    expiresAt?: string | null;
    isEnabled?: boolean;
    isRepeatable?: boolean;
    repeatIntervalMinutes?: number | null;
};

