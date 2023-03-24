import { executeAsync } from '../../utils/executeAsync.js';
import { exitProgram } from '../../utils/exitProgram.js';
import { tryPromise } from '../../utils/tryPromise.js';

/**
 *
 * @returns {Promise<string[] | void>}
 */
export async function getStagedFiles() {
  const [response, err] = await tryPromise(() =>
    executeAsync('git diff --cached --name-only')
  );

  if (err) return exitProgram('Error : getting staged files');

  const { stdout } = response;
  const files = stdout.trim().split('\n').filter(Boolean);

  return files;
}
