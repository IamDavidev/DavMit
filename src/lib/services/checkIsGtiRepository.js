import { access } from 'node:fs/promises';

import { exitProgram } from '../../utils/exitProgram.js';
import { tryPromise } from '../../utils/tryPromise.js';

/**
 *
 * @returns {Promise<void>}
 */
export async function checkIsGitRepository() {
  /**
   * @type {[boolean, Error | null]}
   */
  const [, error] = await tryPromise(() => access('.git'));

  if (error) return exitProgram("Is not a git repository, can't continue");
}
