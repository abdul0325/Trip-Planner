
export type PaginationMetaType = {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type PaginatedResponseType<T> = {
    data: T[];
    meta: PaginationMetaType;
}

export type PaginatedfuncArgs = {
    page: number;
    limit: number;
}

export type ProductFuncSearchParams = {
    searchKey?: string
    categories?: string[];
    size?: string[];    
    color?: string[];
    price_min?: number;
    price_max?: number;
}

export type ProductInfiniteFuncArgsWithSearchAndPagination = PaginatedfuncArgs & ProductFuncSearchParams

