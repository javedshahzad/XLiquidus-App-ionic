/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardChargeCryptoRequestStatus } from './CardChargeCryptoRequestStatus';
import type { CloudCartType } from './CloudCartType';
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { MicroServiceChargeRequestFee } from './MicroServiceChargeRequestFee';
import type { NullableOfVendorType } from './NullableOfVendorType';
import type { OrderRequestType } from './OrderRequestType';
import type { PaymentAddress } from './PaymentAddress';
export type MicroDepositCryptoResponse = {
    id?: string;
    requestId?: string;
    amountInUsd?: number;
    currency?: CloudCheckoutCurrency;
    cartType?: CloudCartType;
    transactionSetId?: string;
    status?: CardChargeCryptoRequestStatus;
    paymentAddress?: PaymentAddress;
    feesTotalInUsd?: number;
    totalChargeAmount?: number;
    requestType?: OrderRequestType;
    vendorPaymentCode?: string | null;
    interactivePaymentFlowUrl?: string | null;
    vendor?: NullableOfVendorType;
    vendorChargeId?: string | null;
    fees?: Array<MicroServiceChargeRequestFee>;
    error?: string | null;
};

