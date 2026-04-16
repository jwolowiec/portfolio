export interface ActionResponse<T, TData = void> {
    success: boolean;
    message?: string;
    errors?: {
        [K in keyof T]?: string[];
    };
    data?: TData;
}