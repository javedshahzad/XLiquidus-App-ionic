/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceStatus } from './ServiceStatus';
export type SystemStatus = {
    status?: string;
    version?: string;
    timestamp?: string;
    services?: Record<string, ServiceStatus>;
};

