import { executeAsync } from '../../utils/executeAsync.js';
import { exitProgram } from '../../utils/exitProgram.js';
import { tryPromise } from '../../utils/tryPromise.js';

/**
 *
 * @param {string} files
 * @returns {Promise<void>}
 */
export async function gitAddFiles(files) {
  const [, error] = await tryPromise(() => executeAsync(`git add ${files}`));

  if (error) return exitProgram(error.message);
}
