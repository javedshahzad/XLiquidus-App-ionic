/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BalanceDetail } from './BalanceDetail';
import type { LockReference } from './LockReference';
import type { LockTimeline } from './LockTimeline';
export type AssetLock = {
    id?: string;
    type?: string;
    amount?: BalanceDetail;
    status?: string;
    reason?: string;
    reference?: LockReference;
    timeline?: LockTimeline;
};

