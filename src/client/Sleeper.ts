/**
 * Sleeper
 */
export class Sleeper {
  private _sleeping = false;
  private resolve: ((value?: unknown) => void) | null = null;

  /**
   * Wait the specified number of milliseconds
   */
  public static sleep(delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  /**
   * Wait the specified number of milliseconds
   */
  public async sleep(delay: number): Promise<void> {
    await new Promise((resolve) => {
      this.resolve = resolve;

      Sleeper.sleep(delay).then(() => this.wakeUp());

      this._sleeping = true;
    });

    this.resolve = null;
  }

  /**
   * Is the sleeper sleeping
   */
  public get sleeping(): boolean {
    return this._sleeping;
  }

  /**
   * Stop waiting
   */
  public wakeUp(): void {
    this._sleeping = false;

    this.resolve?.();
  }
}
