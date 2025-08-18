/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositMetadata } from './DepositMetadata';
import type { DepositPaymentMethod } from './DepositPaymentMethod';
export type DepositRequest = {
    walletId: string;
    currencyCode: string;
    blockchainNetwork: string;
    referenceId?: string | null;
    depositCode?: string | null;
    amount?: number | null;
    paymentMethod: DepositPaymentMethod;
    autoGenerateCode?: boolean;
    metadata?: DepositMetadata;
};

