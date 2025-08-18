/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OtherEndpointsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getSwagger(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/swagger',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getSwaggerIndexHtml(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/swagger/index.html',
        });
    }
}
