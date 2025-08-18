/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositCodeValidationDetails } from './DepositCodeValidationDetails';
import type { MobileValidationOptimizations } from './MobileValidationOptimizations';
export type DepositPreValidationResponse = {
    correlationId?: string;
    isValid?: boolean;
    validationDetails?: DepositCodeValidationDetails;
    errorMessage?: string | null;
    suggestedActions?: Array<string>;
    canProceedWithDeposit?: boolean;
    estimatedProcessingTime?: string | null;
    requiredVerifications?: Array<string>;
    mobileOptimizations?: MobileValidationOptimizations;
};

