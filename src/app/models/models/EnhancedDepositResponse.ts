/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositCodeGenerationResponse } from './DepositCodeGenerationResponse';
import type { DepositCodeValidationResponse } from './DepositCodeValidationResponse';
import type { DepositMobileFeatures } from './DepositMobileFeatures';
import type { DepositProcessingResponse } from './DepositProcessingResponse';
export type EnhancedDepositResponse = {
    success?: boolean;
    errorMessage?: string | null;
    correlationId?: string;
    requestTimestamp?: string;
    depositCodeValidation?: DepositCodeValidationResponse;
    generatedDepositCode?: DepositCodeGenerationResponse;
    depositProcessing?: DepositProcessingResponse;
    mobileFeatures?: DepositMobileFeatures;
    walletId?: string;
    currencyCode?: string;
    blockchainNetwork?: string;
    depositAddress?: string;
    memo?: string | null;
    qrCodeUrl?: string | null;
    minimumDepositAmount?: number | null;
    expectedConfirmationTime?: number | null;
    referenceId?: string | null;
    depositInstructions?: string | null;
    transactionId?: string | null;
    estimatedConfirmationTime?: string | null;
    expiryTime?: string | null;
    minimumAmount?: number | null;
    maximumAmount?: number | null;
    networkFee?: number | null;
    instructions?: string | null;
};

