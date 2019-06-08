export interface SearchModel {
    limit?: number;
    page?: number;
}

export interface SearchOptions {
    input?: SearchInputOptions;
}

export interface SearchInputOptions {
    search?: boolean;
    reset?: boolean;
    clear?: boolean;
}
