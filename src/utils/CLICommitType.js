import { isCancel, select } from '@clack/prompts';

import { adapterCommitsToOptions } from '../lib/adapters/adapterCommitsToOption.js';
import { exitProgram } from './exitProgram.js';
import { printPrimary } from './uiCLI.js';
import { COMMITS_TYPES } from '../constants/typeCommits.js';

/**
 * @param {string[]} commits
 * @returns  {Promise<{typeCommit: string}>}
 */
export async function CLICommitType() {
  const typeCommit = await select({
    message: printPrimary('Select the type of commit'),
    options: adapterCommitsToOptions(COMMITS_TYPES),
  });
  if (isCancel(typeCommit)) return exitProgram();

  return {
    typeCommit,
  };
}
