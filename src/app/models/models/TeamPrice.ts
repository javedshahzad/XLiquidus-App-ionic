/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FxRate } from './FxRate';
import type { PercentageFlux } from './PercentageFlux';
export type TeamPrice = {
    id?: number;
    name?: string;
    currentPrice?: number;
    previousPrice?: number;
    priceFluxPercentage?: PercentageFlux;
    quoteId?: string | null;
    countryId?: number;
    teamId?: number;
    blockchainAlias?: string | null;
    updateOn?: string | null;
    fxRate?: FxRate;
};

