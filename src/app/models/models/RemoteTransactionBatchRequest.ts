/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RemoteTransactionRequest } from './RemoteTransactionRequest';
export type RemoteTransactionBatchRequest = {
    batchReference: string;
    transactions: Array<RemoteTransactionRequest>;
    processAsync?: boolean;
    continueOnError?: boolean;
    validateBeforeProcessing?: boolean;
    metadata?: Record<string, any> | null;
};

