/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RemoteTransactionResponse = {
    success?: boolean;
    transactionId?: string;
    remoteReference?: string;
    status?: string;
    processedAt?: string;
    balanceAfter?: number | null;
    errorMessage?: string | null;
    errorCode?: string | null;
    validationErrors?: Array<string> | null;
    correlationId?: string;
    processedAsync?: boolean;
    estimatedCompletionTime?: string | null;
    metadata?: Record<string, any> | null;
};

