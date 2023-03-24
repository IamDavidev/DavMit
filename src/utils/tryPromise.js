/**
 * Converts a promise to a tuple of [data, error]
 * @param {*} promise
 * @returns {[T, null] | [null, Error]}
 */
export async function tryPromise(promise) {
  try {
    const resp = (await promise()) ?? true;
    return [resp, null];
  } catch (throwable) {
    if (throwable instanceof Error) return [null, throwable];
    return throwable;
  }
}
