/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssetBackedCurrency } from './AssetBackedCurrency';
import type { DynamicUserCoin } from './DynamicUserCoin';
import type { PercentageFlux } from './PercentageFlux';
import type { PublicTeamExtendedPrice } from './PublicTeamExtendedPrice';
export type WalletAssets = {
    tokens?: Array<DynamicUserCoin>;
    digitalCurrencies?: Array<AssetBackedCurrency>;
    totalCoins?: number;
    totalDigitalCurrencies?: number;
    highestTeamSaleOffer?: any;
    totalCost?: number;
    profitLoss?: number;
    profitLossPercentage?: PercentageFlux;
    isProfit?: boolean;
    totalMarketPrice?: number;
    teams?: Array<PublicTeamExtendedPrice>;
};

