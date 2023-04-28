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
      if(value.includes('-')){
        const isValid = value.split('-').every((msg) => {
          return msg.length <= 50;
        })
        return !isValid && 'The commit message cannot exceed 50 characters';
      }

      if(value.length > 50) return 'The commit message cannot exceed 50 characters';
    },
  })

  if (isCancel(msg)) return exitProgram();


  const lengthCommits = msg.replace("-","").split('-').length;

  const formatMsg = lengthCommits >= 2 ? "\n" + msg
    .split('-')
    .filter(Boolean)
    .map((msg) => `- ${msg.trim()} \n`)
    .join('')
    : msg.replace("-","");

  if (isCancel(msg)) return exitProgram();

  return {
    msg,
    formatMsg,
  };
}
