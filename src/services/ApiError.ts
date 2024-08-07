export interface IApiError {
  code?: any;
  message?: string;
  details?: Record<string, string>;
}

export class ApiError extends Error implements IApiError {
  readonly details;
  readonly code;

  constructor(options?: IApiError) {
    super(options?.message);
    this.code = options?.code;
    this.details = options?.details;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default ApiError;
