export type ServiceResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string | any;
    status: number;
    code: number;
};

export class ResponseHelper {
    /**
     * Return a standardized success response
     */
    static success<T>(data: T, message: string = 'Success', status: number = 200): ServiceResponse<T> {
        return {
            success: true,
            data,
            message,
            status: Number(status),
            code: Number(status)
        };
    }

    /**
     * Return a standardized error response
     * @param error - The error object or string
     * @param message - User facing message
     * @param status - HTTP status code
     * @param data - Optional fallback data (e.g. [] for lists)
     */
    static error<T = null>(
        error: unknown,
        message: string = 'Internal Server Error',
        status: number = 500,
        data: T | null = null
    ): ServiceResponse<T | null> {
        let extractedError: any = 'Unknown Error';

        if (typeof error === 'string') {
            extractedError = error;
        } else if (error instanceof Error) {
            extractedError = error.message;
        } else if (error && typeof error === 'object') {
            // Extract message and avoid returning raw objects with string codes (like Prisma/Better-Auth codes)
            extractedError = (error as any).message || (error as any).errors || JSON.stringify(error);
        }

        return {
            success: false,
            message: message || (typeof extractedError === 'string' ? extractedError : 'Error'),
            error: extractedError,
            data: data,
            status: Number(status),
            code: Number(status)
        };
    }
}
