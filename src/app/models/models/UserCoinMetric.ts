/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PercentageFlux } from './PercentageFlux';
import type { WalletExtended } from './WalletExtended';
export type UserCoinMetric = {
    userWallet?: WalletExtended;
    userWalletTotalCoins?: number;
    onHoldTotalCoins?: number;
    userWalletDigitalCurrencies?: number;
    onHoldTotalDigitalCurrencies?: number;
    highestTeamSaleOffer?: any;
    profitLoss?: number;
    profitLossPercentage?: PercentageFlux;
    isProfit?: boolean;
    totalMarketPrice?: number;
    teams?: Array<any>;
};

