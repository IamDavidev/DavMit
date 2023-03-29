import { access } from 'node:fs/promises';

import { exitProgram } from '../../utils/exitProgram.js';
import { tryPromise } from '../../utils/tryPromise.js';

/**
 * @returns {Promise<boolean>}
 */
export async function checkIsGitRepository() {
  /**
   * @type {[boolean, Error | null]}
   */
  const [data, error] = await tryPromise(() => {
    access('.git');
    return true;
  });

  if (error) return exitProgram("Is not a git repository, can't continue");

  return data;
}
