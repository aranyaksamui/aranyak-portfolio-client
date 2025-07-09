export interface StrapiMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface StrapiResponse<T> {
    data: T;
    meta: StrapiMeta;
}

export interface MediaFormat {
    small?: {
        url: string;
    };
}

export interface Media {
    id: number;
    formats: MediaFormat;
}
