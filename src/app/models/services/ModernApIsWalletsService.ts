/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositPreValidationRequest } from '../models/DepositPreValidationRequest';
import type { DepositPreValidationResponse } from '../models/DepositPreValidationResponse';
import type { DepositRequest } from '../models/DepositRequest';
import type { EnhancedDepositResponse } from '../models/EnhancedDepositResponse';
import type { EnhancedWalletResponse } from '../models/EnhancedWalletResponse';
import type { TransferRequest } from '../models/TransferRequest';
import type { TransferResponse } from '../models/TransferResponse';
import type { WalletBalance } from '../models/WalletBalance';
import type { WalletTransaction } from '../models/WalletTransaction';
import type { WithdrawRequest } from '../models/WithdrawRequest';
import type { WithdrawResponse } from '../models/WithdrawResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsWalletsService {
    /**
     * @returns EnhancedWalletResponse OK
     * @throws ApiError
     */
    public static getApiWalletsBalances(): CancelablePromise<EnhancedWalletResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wallets/balances',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns WalletBalance OK
     * @throws ApiError
     */
    public static getApiWalletsBalance({
        walletId,
    }: {
        walletId: string,
    }): CancelablePromise<WalletBalance> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wallets/{walletId}/balance',
            path: {
                'walletId': walletId,
            },
        });
    }
    /**
     * @returns WalletTransaction OK
     * @throws ApiError
     */
    public static getApiWalletsTransactions({
        page = 1,
        pageSize = 10,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<Array<WalletTransaction>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wallets/transactions',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns WalletTransaction OK
     * @throws ApiError
     */
    public static getApiWalletsTransactions1({
        walletId,
        page = 1,
        pageSize = 10,
    }: {
        walletId: string,
        page?: number,
        pageSize?: number,
    }): CancelablePromise<Array<WalletTransaction>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wallets/{walletId}/transactions',
            path: {
                'walletId': walletId,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns WalletTransaction OK
     * @throws ApiError
     */
    public static getApiWalletsTransactions2({
        transactionId,
    }: {
        transactionId: string,
    }): CancelablePromise<WalletTransaction> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wallets/transactions/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
        });
    }
    /**
     * @returns TransferResponse OK
     * @throws ApiError
     */
    public static postApiWalletsTransfer({
        requestBody,
    }: {
        requestBody: TransferRequest,
    }): CancelablePromise<TransferResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wallets/transfer',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns WithdrawResponse OK
     * @throws ApiError
     */
    public static postApiWalletsWithdraw({
        requestBody,
    }: {
        requestBody: WithdrawRequest,
    }): CancelablePromise<WithdrawResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wallets/withdraw',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns EnhancedDepositResponse OK
     * @throws ApiError
     */
    public static postApiWalletsDeposit({
        requestBody,
    }: {
        requestBody: DepositRequest,
    }): CancelablePromise<EnhancedDepositResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wallets/deposit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns DepositPreValidationResponse OK
     * @throws ApiError
     */
    public static postApiWalletsDepositPreValidate({
        requestBody,
    }: {
        requestBody: DepositPreValidationRequest,
    }): CancelablePromise<DepositPreValidationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wallets/deposit/pre-validate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
}
