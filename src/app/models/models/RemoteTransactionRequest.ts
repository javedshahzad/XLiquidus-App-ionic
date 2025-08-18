/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RemoteTransactionRequest = {
    transactionType: string;
    amount: number;
    currencyCode: string;
    walletId: string;
    userId?: string | null;
    description?: string | null;
    remoteReference: string;
    feeAmount?: number | null;
    feeCurrencyCode?: string | null;
    blockchainTransactionId?: string | null;
    blockchainNetwork?: string | null;
    metadata?: Record<string, any> | null;
    remoteTimestamp?: string | null;
    processAsync?: boolean;
};

