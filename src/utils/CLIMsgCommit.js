import { isCancel, text } from '@clack/prompts';
import { exitProgram } from './exitProgram.js';
import { printPrimary } from './uiCLI.js';

/**
 *
 * @returns {Promise<{msg: string, formatMsg: string}>}
 */
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

  if (isCancel(msg)) return exitProgram();

  const formatMsg = "\n"+ msg.split('-').length <= 1 ? msg.replace("-","") : msg
    .split('-')
    .filter(Boolean)
    .map((msg) => `- ${msg.trim()} \n`)
    .join('');

  // const formatMsg = msg
  //   .split('-')
  //   .filter(Boolean)
  //   .map((msg) => `- ${msg.trim()} \n`)
  //   .join('');

    // const  formatMsg = msg.split("-").length > 1 

  if (isCancel(msg)) return exitProgram();

  return {
    msg,
    formatMsg,
  };
}
