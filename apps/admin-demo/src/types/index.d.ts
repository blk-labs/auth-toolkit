declare type BaseBackendResponse<T> = {
    status: number;
    message: string;
    data: T;
};