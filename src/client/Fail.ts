import { HttpError } from './HttpError';
import type { HttpStatus } from './HttpStatus';

/**
 * The request failed
 */
export class Fail extends HttpError {
  public constructor(sender: string, status: HttpStatus, data: any) {
    super(sender, status, Fail.parseError(data), { data });
  }

  private static parseError(data: any): string {
    if (!data) return '';
    if (typeof data === 'string') return data;
    if (data.message) return data.message;

    try {
      return JSON.stringify(data);
    } catch (e) {
      return 'Fail.parseError: parsing error';
    }
  }
}
