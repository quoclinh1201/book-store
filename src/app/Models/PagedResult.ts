import { Result } from "./Result";

export interface PagedResult<T> extends Result<T[]> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
}