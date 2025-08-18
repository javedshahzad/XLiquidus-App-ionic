/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderPaymentAddress } from './OrderPaymentAddress';
import type { PaymentInfo } from './PaymentInfo';
export type Customer = {
    id?: string;
    email?: string | null;
    phone?: string | null;
    address?: OrderPaymentAddress;
    paymentInfo?: PaymentInfo;
    hasValidIdentityScreeningOnFile?: boolean;
    isAccountLockedOrFrozen?: boolean;
    firstName?: string | null;
    lastName?: string | null;
    preferredName?: string | null;
    tag?: string;
    identityTotalTransactionAmount?: number;
    externalId?: string | null;
};

