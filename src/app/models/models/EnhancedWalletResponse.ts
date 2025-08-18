/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PortfolioSummary } from './PortfolioSummary';
import type { WalletActions } from './WalletActions';
import type { WalletAsset } from './WalletAsset';
import type { WalletMetadata } from './WalletMetadata';
export type EnhancedWalletResponse = {
    summary?: PortfolioSummary;
    assets?: Array<WalletAsset>;
    actions?: WalletActions;
    metadata?: WalletMetadata;
};

