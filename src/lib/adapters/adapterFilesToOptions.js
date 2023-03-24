/**
 *
 * @param {string[]} files
 * @returns {import('@clack/prompts').Option[]}
 */
export function adapterFilesToOptions(files) {
  return files.map((fileStr) => {
    return {
      value: fileStr,
      label: fileStr,
    };
  });
}
