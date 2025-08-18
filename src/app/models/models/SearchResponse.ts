/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FacetValue } from './FacetValue';
import type { SearchResult } from './SearchResult';
export type SearchResponse = {
    results?: Array<SearchResult>;
    totalResults?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
    query?: string;
    category?: string;
    sortBy?: string;
    sortDirection?: string;
    filters?: Record<string, string>;
    facets?: Record<string, Array<FacetValue>>;
};

