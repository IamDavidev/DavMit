/**
 *
 * @param {{description:string,emoji:string}[]} commits
 * @returns {{value:string,label:string}[]}}
 */
export function adapterCommitsToOptions(commits) {
  return commits.map((commit) => {
    const msgCommit =
      '[ ` ' + commit.description + ' · ' + commit.emoji + ' ` ]';
    return {
      value: msgCommit,
      label: msgCommit,
    };
  });
}
