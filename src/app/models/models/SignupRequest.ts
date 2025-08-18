/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SignupRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string | null;
    country?: string | null;
    city?: string | null;
    preferredLanguage?: string | null;
    preferredCurrency?: string | null;
    acceptTerms: boolean;
    acceptPrivacyPolicy: boolean;
};

