/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RemoteTransactionResponse } from './RemoteTransactionResponse';
export type RemoteTransactionBatchResponse = {
    batchId?: string;
    totalTransactions?: number;
    successfulTransactions?: number;
    failedTransactions?: number;
    transactionResults?: Array<RemoteTransactionResponse>;
    startedAt?: string;
    completedAt?: string | null;
    isProcessing?: boolean;
    correlationId?: string;
};

