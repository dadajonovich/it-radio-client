import { ErrorInfo } from './ErrorInfo';
import type { HttpStatus } from './HttpStatus';

/**
 * The HttpError class stores error information and HTTP status
 */
export class HttpError extends ErrorInfo {
  readonly status: HttpStatus;

  constructor(sender: string, status: HttpStatus, message: string, info?: Record<string, any> | null, stack?: string) {
    super(sender, message, info, stack);

    this.status = status;
  }
}
