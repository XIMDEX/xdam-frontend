export interface SearchModel {
    limit?: number;
    page?: number;
}

export interface SearchOptions {
    input?: SearchInputOptions;
}

export interface SearchInputOptions {
    hasSearch?: boolean;
    hasReset?: boolean;
    hasClear?: boolean;
}
