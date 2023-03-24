import { executeAsync } from '../../utils/executeAsync.js';
import { exitProgram } from '../../utils/exitProgram.js';
import { tryPromise } from '../../utils/tryPromise.js';

/**
 *
 * @returns {Promise<string[] | null>}
 */
export async function getChangedFiles() {
  const [response, err] = await tryPromise(() =>
    executeAsync('git ls-files --modified --others --exclude-standard')
  );

  if (err) {
    exitProgram('Error : getting changed files');
    return null;
  }

  const { stdout } = response;
  const files = stdout.trim().split('\n').filter(Boolean);

  return files;
}
