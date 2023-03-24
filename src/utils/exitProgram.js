import { cancel } from '@clack/prompts';

/**
 * @param {string} msg
 * @returns {void}
 */
export function exitProgram(msg) {
  cancel(msg ?? "Exit program, can't continue");
  process.exit(0);
}
