import { isCancel, multiselect } from '@clack/prompts';
import { adapterFilesToOptions } from '../lib/adapters/adapterFilesToOptions.js';
import { exitProgram } from './exitProgram.js';
import { printPrimary } from './uiCLI.js';

/**
 *
 *  @param {string[]} files
 * @returns {Promise<{filesSelectedToCommit: string[]}>}
 */
export async function CLIFilesCommit(files) {
  const filesSelectedToCommit = await multiselect({
    message: printPrimary('Select the files to commit'),
    options: adapterFilesToOptions(files),
  });

  if (isCancel(filesSelectedToCommit)) return exitProgram();

  return {
    filesSelectedToCommit,
  };
}
