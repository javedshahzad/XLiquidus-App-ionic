/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WithdrawRequest = {
    walletId: string;
    amount: number;
    currencyCode: string;
    destinationAddress: string;
    blockchainNetwork: string;
    description?: string | null;
    referenceId?: string | null;
    includeFee?: boolean;
    memo?: string | null;
};

