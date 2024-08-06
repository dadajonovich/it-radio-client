type PerformanceOfAsyncResult<T> = {
  result: T;
  totalTime: number;
};

/**
 * Count the execution time of a promise
 */
export async function performanceOfPromise<T>(promise: Promise<T>): Promise<PerformanceOfAsyncResult<T>> {
  const startTime = performance.now();

  const result = await promise;

  const totalTime = performance.now() - startTime;

  return { result, totalTime };
}
