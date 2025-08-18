/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcceptedPaymentMethod } from './AcceptedPaymentMethod';
import type { CloudCheckoutCurrency } from './CloudCheckoutCurrency';
import type { CloudFee } from './CloudFee';
import type { Customer } from './Customer';
import type { EstimatedProfitProjection } from './EstimatedProfitProjection';
import type { Image } from './Image';
import type { Image2 } from './Image2';
import type { LedgerMarketExchangeRate } from './LedgerMarketExchangeRate';
import type { ListingMessageType } from './ListingMessageType';
import type { ListingSale } from './ListingSale';
import type { MarketPaymentMethod } from './MarketPaymentMethod';
import type { MicroDepositCryptoResponse } from './MicroDepositCryptoResponse';
import type { NullableOfMarginModelType } from './NullableOfMarginModelType';
import type { NullableOfPricingModel } from './NullableOfPricingModel';
export type MarketListing = {
    id?: string;
    sellerId?: string;
    asset?: CloudCheckoutCurrency;
    marketSymbol?: string | null;
    mainImage?: Image;
    imageGallery?: Array<Image2> | null;
    quantity?: number | null;
    price?: number | null;
    startingPrice?: number | null;
    maximumPrice?: number | null;
    minimumPrice?: number | null;
    pricingModel?: NullableOfPricingModel;
    marginModelType?: NullableOfMarginModelType;
    margin?: number | null;
    unit?: number | null;
    currentRate?: LedgerMarketExchangeRate;
    acceptedPaymentMethods?: Array<AcceptedPaymentMethod> | null;
    requestedListingDate?: string | null;
    listingDate?: string;
    expirationDate?: string;
    paymentSource?: MarketPaymentMethod;
    isActive?: boolean;
    message?: string | null;
    fees?: Array<CloudFee> | null;
    messageType?: ListingMessageType;
    timeRemaining?: string;
    totalPriceInUsd?: number;
    customer?: Customer;
    depositRequest?: MicroDepositCryptoResponse;
    estimatedProfit?: EstimatedProfitProjection;
    totalFees?: number;
    sales?: Array<ListingSale>;
};

