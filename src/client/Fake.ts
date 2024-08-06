import { Sleeper } from './Sleeper';

/**
 * Simulator of requests
 */
export abstract class Fake {
  protected abstract isFake: boolean;

  /**
   * Simulate request
   */
  protected async fake(log: string): Promise<void>;
  protected async fake<D>(log: string, data: D): Promise<D>;
  protected async fake<D>(log: string, data?: D): Promise<D | void> {
    await Sleeper.sleep(Math.floor(Math.random() * 500 + 200));

    console.log(`Fake: ${log}`);

    return data;
  }
}
