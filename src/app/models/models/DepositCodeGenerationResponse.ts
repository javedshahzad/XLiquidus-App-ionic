/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MobileFeatures } from './MobileFeatures';
export type DepositCodeGenerationResponse = {
    depositCode?: string;
    expiresAt?: string;
    success?: boolean;
    errorMessage?: string | null;
    qrCodeDataUrl?: string | null;
    mobileFeatures?: MobileFeatures;
};

