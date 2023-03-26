import chalk from 'chalk';

/**
 * @param {string} msg
 * @returns {string}
 */
export function printPrimary(msg) {
  return chalk.magenta.bold(msg);
}

/**
 * @param {string} msg
 * @returns {string}
 */
export function printSecondary(msg) {
  return chalk.yellow.bold(msg);
}

/**
 * @param {string} msg
 * @returns {string}
 */
export function printSuccess(msg) {
  return chalk.green.bold(msg);
}

/**
 * @param {string} msg
 * @returns {string}
 */
export function bgPrimary(msg) {
  return chalk.bgMagenta.bold.black(msg);
}

/**
 * @param {string} msg
 * @returns {string}
 */
export function bgSecondary(msg) {
  return chalk.bgYellow.bold.black(msg);
}

/**
 * @param {string} msg
 * @returns {string}
 */
export function bgSuccess(msg) {
  return chalk.bgGreen.bold.black(msg);
}
