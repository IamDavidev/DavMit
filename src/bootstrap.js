import { intro, isCancel, multiselect, outro } from '@clack/prompts';
import Chalk from 'chalk';

import { checkGitRepository } from './lib/services/checkGtiRepository.js';
import { getChangedFiles } from './lib/services/getChangedFiles.js';
import { adapterFilesToOptions } from './lib/adapters/adapterFilesToOptions.js';
import { exitProgram } from './utils/exitProgram.js';

const descriptionCLI = ' Commits Semantics ';
const nameCLI = ' { Davmit } ';
const versionCLI = ' 0.0.1@alpha ';

const commitCreatedMsg = 'Commit created successfully';

/**
 *
 * @param {Function} cmd
 * @returns {Promise<void>}
 */

/**
 * function to run at the start of the application
 * @returns {Promise<void>}
 */
export async function $bootstrap() {
  console.log(' ');
  intro(
    Chalk.bgCyanBright.black(descriptionCLI) +
      Chalk.bgYellow.black(nameCLI) +
      Chalk.bgCyanBright.black(versionCLI)
  );

  await checkGitRepository();

  // const filesStaged = await getStagedFiles();
  const filesChanged = await getChangedFiles();

  const filesToCommit = await multiselect({
    message: 'Select the files to commit',
    options: adapterFilesToOptions(filesChanged),
  });
  if (isCancel(filesToCommit)) return exitProgram();

  await outro(Chalk.bgGreenBright.black(commitCreatedMsg));
}
