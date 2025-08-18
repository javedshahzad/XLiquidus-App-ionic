/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PriceTier } from './PriceTier';
import type { PricingStrategy } from './PricingStrategy';
import type { TradingPair } from './TradingPair';
export type Market = {
    id?: string;
    name?: string;
    description?: string | null;
    logoUrl?: string | null;
    status?: string;
    type?: string;
    category?: string;
    tags?: Array<string>;
    pricingStrategy?: PricingStrategy;
    priceTiers?: Array<PriceTier> | null;
    basePrice?: number;
    createdAt?: string;
    updatedAt?: string;
    tradingPairs?: Array<TradingPair>;
};

