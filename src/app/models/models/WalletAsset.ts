/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssetBalance } from './AssetBalance';
import type { AssetLock } from './AssetLock';
import type { AssetMarketData } from './AssetMarketData';
import type { CryptocurrencyInfo } from './CryptocurrencyInfo';
export type WalletAsset = {
    cryptocurrency?: CryptocurrencyInfo;
    balance?: AssetBalance;
    marketData?: AssetMarketData;
    locks?: Array<AssetLock>;
};

