/**
 * The ErrorInfo class stores
 * the name of the error sender
 * and other information
 */
export class ErrorInfo extends Error {
  public readonly sender: string;
  public readonly info: Record<string, any> | null;

  public constructor(sender: string, message: string, info?: Record<string, any> | null, stack?: string) {
    super(message);

    this.sender = sender;
    this.info = info || null;

    if (stack) {
      this.stack = stack;
    }
  }
}
