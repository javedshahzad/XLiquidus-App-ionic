/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionSource } from './TransactionSource';
export type WalletTransaction = {
    transactionId?: string;
    walletId?: string;
    userId?: string;
    transactionType?: string;
    amount?: number;
    currencyCode?: string;
    transactionDate?: string;
    status?: string;
    description?: string;
    referenceId?: string;
    feeAmount?: number;
    feeCurrencyCode?: string;
    blockchainTransactionId?: string | null;
    blockchainNetwork?: string | null;
    source?: TransactionSource;
    remoteSystemId?: string | null;
    remoteReference?: string | null;
    remoteSubmittedAt?: string | null;
    remoteIpAddress?: string | null;
    remoteApiKeyName?: string | null;
};

