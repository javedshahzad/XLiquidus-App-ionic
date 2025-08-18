/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BalanceMetric } from '../models/BalanceMetric';
import type { News } from '../models/News';
import type { UserCoinMetric } from '../models/UserCoinMetric';
import type { WalletExtended2 } from '../models/WalletExtended2';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModernApIsDashboardService {
    /**
     * @returns UserCoinMetric OK
     * @throws ApiError
     */
    public static getApiDashboardUserCoins({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserCoinMetric> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/user/{userId}/coins',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns WalletExtended2 OK
     * @throws ApiError
     */
    public static getApiDashboardUserWallet({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<WalletExtended2> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/user/{userId}/wallet',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns BalanceMetric OK
     * @throws ApiError
     */
    public static getApiDashboardUserBalance({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<BalanceMetric>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/user/{userId}/balance',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns News OK
     * @throws ApiError
     */
    public static getApiDashboardNews(): CancelablePromise<Array<News>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/news',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiDashboard(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard',
        });
    }
}
