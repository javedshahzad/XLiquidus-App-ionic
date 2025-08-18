/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositProcessingStatus } from './DepositProcessingStatus';
import type { MobileProcessingDetails } from './MobileProcessingDetails';
export type DepositProcessingResponse = {
    success?: boolean;
    transactionId?: string | null;
    depositAddress?: string | null;
    errorMessage?: string | null;
    expectedConfirmationTime?: string | null;
    status?: DepositProcessingStatus;
    mobileDetails?: MobileProcessingDetails;
};

