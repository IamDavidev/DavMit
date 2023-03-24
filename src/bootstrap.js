import {
  confirm,
  intro,
  isCancel,
  multiselect,
  outro,
  select,
  text,
} from '@clack/prompts';
import Chalk from 'chalk';

import { COMMITS_TYPES } from './constants/typeCommits.js';
import { adapterFilesToOptions } from './lib/adapters/adapterFilesToOptions.js';
import { checkGitRepository } from './lib/services/checkGtiRepository.js';
import { getChangedFiles } from './lib/services/getChangedFiles.js';
import { getStagedFiles } from './lib/services/getStagedFiles.js';
import { exitProgram } from './utils/exitProgram.js';
import {
  bgPrimary,
  bgSecondary,
  bgSuccess,
  printPrimary,
  printSecondary,
  printSuccess,
} from './utils/uiCLI.js';

import { adapterCommitsToOptions } from './lib/adapters/adapterCommitsToOption.js';
import { executeAsync } from './utils/executeAsync.js';
import { tryPromise } from './utils/tryPromise.js';

const descriptionCLI = ' Commits Semantics ';
const nameCLI = ' { Davmit } ';
const versionCLI = ' 0.0.2@beta';
const commitCreatedMsg = 'Commit created successfully';

/**
 *
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

export async function CLIMsgCommit() {
  const msg = await text({
    message: printPrimary(`Enter the commit message`),
    validate: (value) => {
      if (!value.includes('-')) {
        if (value.length > 50)
          return 'The commit message cannot exceed 50 characters';
      }

      const msgSplit = value.split('-');

      msgSplit.forEach((msg) => {
        if (msg.length > 50)
          return 'The commit message cannot exceed 50 characters';
      });
    },
  });

  const formatMsg = msg
    .split('-')
    .filter(Boolean)
    .map((msg) => `- ${msg.trim()} \n`)
    .join('');

  if (isCancel(msg)) return exitProgram();

  return {
    msg,
    formatMsg,
  };
}

export async function gitAddFiles(files) {
  const [, error] = await tryPromise(() => executeAsync(`git add ${files}`));

  if (error) return exitProgram(error.message);
}

export async function gitCommit(msg) {
  const [, error] = await tryPromise(() =>
    executeAsync(`git commit -m "${msg}"`)
  );

  if (error) return exitProgram(error.message);
}

export async function $runCLI(filesToAdd, filesSelectedToCommit) {
  const { typeCommit } = await CLICommitType();
  const { formatMsg } = await CLIMsgCommit();

  const msgCommit = `${typeCommit} \n ${formatMsg}`
    .replaceAll(',', '')
    .replaceAll('`', '\\`');

  const filesList = filesSelectedToCommit
    .map((file) => {
      return `  - ${file} \n`;
    })
    .join('');

  const confirmCommit = await confirm({
    message:
      printPrimary('\n Commit : \n') +
      printSecondary(msgCommit) +
      printPrimary('files : \n') +
      printSecondary(filesList) +
      printSuccess(`Confirm this commit? (files and message)`),
    initialValue: true,
  });
  if (isCancel(confirmCommit)) return exitProgram();

  if (!confirmCommit) return exitProgram('Commit canceled');

  await gitAddFiles(filesToAdd);
  await gitCommit(msgCommit);
  await outro(Chalk.bgGreenBright.black(commitCreatedMsg));
}

/**
 * function to run at the start of the application
 * @returns {Promise<void>}
 */
export async function $bootstrap() {
  console.log(' ');
  intro(
    bgPrimary(descriptionCLI) + bgSecondary(nameCLI) + bgPrimary(versionCLI)
  );

  await checkGitRepository();

  const filesStaged = await getStagedFiles();

  if (filesStaged.length) {
    const filesToAdd = filesStaged.join(' ');
    console.log(bgSuccess('\n You have files staged ' + filesToAdd + ' \n'));
    return await $runCLI(filesToAdd, filesStaged);
  }

  const filesChanged = await getChangedFiles();

  if (!filesStaged.length && !filesChanged.length)
    return exitProgram('No files to commit');

  const { filesSelectedToCommit } = await CLIFilesCommit(filesChanged);
  const filesToAdd = filesSelectedToCommit.join(' ');

  await $runCLI(filesToAdd, filesSelectedToCommit);
}
