import { cancel } from '@clack/prompts';

/**
 * @param {string} msg
 * @returns {void}
 */
export function exitProgram(msg) {
  cancel(msg ?? 'Exit program');
  process.exit(0);
  return true;
}
