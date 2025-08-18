/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositCodeValidationDetails } from './DepositCodeValidationDetails';
export type DepositCodeValidationResponse = {
    isValid?: boolean;
    validationDetails?: DepositCodeValidationDetails;
    errorMessage?: string | null;
    validatedAt?: string;
    suggestedActions?: Array<string> | null;
};

