/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyAmount } from './CurrencyAmount';
import type { PortfolioChange } from './PortfolioChange';
export type PortfolioSummary = {
    totalPortfolioValue?: CurrencyAmount;
    availableForTrading?: CurrencyAmount;
    lockedFunds?: CurrencyAmount;
    portfolioChange24h?: PortfolioChange;
};

