/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RemoteTransactionBatchRequest } from '../models/RemoteTransactionBatchRequest';
import type { RemoteTransactionBatchResponse } from '../models/RemoteTransactionBatchResponse';
import type { RemoteTransactionRequest } from '../models/RemoteTransactionRequest';
import type { RemoteTransactionResponse } from '../models/RemoteTransactionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsRemoteTransactionService {
    /**
     * @returns RemoteTransactionResponse OK
     * @throws ApiError
     */
    public static postApiRemoteTransactions({
        requestBody,
    }: {
        requestBody: RemoteTransactionRequest,
    }): CancelablePromise<RemoteTransactionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/remote/transactions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns RemoteTransactionBatchResponse OK
     * @throws ApiError
     */
    public static postApiRemoteTransactionsBatch({
        requestBody,
    }: {
        requestBody: RemoteTransactionBatchRequest,
    }): CancelablePromise<RemoteTransactionBatchResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/remote/transactions/batch',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiRemoteTransactionsCheck({
        remoteReference,
    }: {
        remoteReference: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/remote/transactions/check/{remoteReference}',
            path: {
                'remoteReference': remoteReference,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiRemoteTransactionsCapabilities(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/remote/transactions/capabilities',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
}
