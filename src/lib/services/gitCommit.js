import { executeAsync } from '../../utils/executeAsync.js';
import { exitProgram } from '../../utils/exitProgram.js';
import { tryPromise } from '../../utils/tryPromise.js';

/**
 *
 * @param {string} msg
 * @returns {Promise<void>}
 */
export async function gitCommit(msg) {
  const [, error] = await tryPromise(() =>
    executeAsync(`git commit -m "${msg}"`)
  );

  if (error) return exitProgram(error.message);
}
