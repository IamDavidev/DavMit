import { confirm, intro, isCancel, outro } from '@clack/prompts'
import Chalk from 'chalk'

import { checkIsGitRepository } from './lib/services/checkIsGtiRepository.js'
import { getChangedFiles } from './lib/services/getChangedFiles.js'
import { getStagedFiles } from './lib/services/getStagedFiles.js'
import { exitProgram } from './utils/exitProgram.js'
import { bgPrimary, bgSecondary, bgSuccess, printPrimary, printSecondary, printSuccess, } from './utils/uiCLI.js'

import { gitAddFiles } from './lib/services/gitAddFiles.js'
import { gitCommit } from './lib/services/gitCommit.js'
import { CLICommitType } from './utils/CLICommitType.js'
import { CLIFilesCommit } from './utils/CLIFilesCommit.js'
import { CLIMsgCommit } from './utils/CLIMsgCommit.js'

const descriptionCLI = ' Commits Semantics '
const nameCLI = ' { Davmit } '
const versionCLI = '1.0.7'
const commitCreatedMsg = 'Commit created successfully'

/**
 * @param {string} filesToAdd
 * @param {string[]} filesSelectedToCommit
 * @returns {Promise<void>}
 */
export async function $runCLI (filesToAdd, filesSelectedToCommit) {
  const { typeCommit } = await CLICommitType()
  const { formatMsg } = await CLIMsgCommit()

  const msgCommit = `${typeCommit} ${formatMsg}`
    .replaceAll(',', '')
    .replaceAll('`', '\\`')

  const filesList = filesSelectedToCommit
    .map((file) => {
      return `- ${file} \n`
    })
    .join('')

  const confirmCommit = await confirm({
    message: printPrimary('\n \n Commit : \n') +
      printSecondary(msgCommit + '\n') +
      printPrimary('files : \n') +
      printSecondary(filesList + '\n') +
      printSuccess(`Confirm this commit? (files and message)`),
    initialValue: true,
  })

  if (isCancel(confirmCommit)) return exitProgram()

  if (!confirmCommit) return exitProgram('Commit canceled')

  await gitAddFiles(filesToAdd)
  await gitCommit(msgCommit)
  await outro(Chalk.bgGreenBright.black(commitCreatedMsg))
}

/**
 * @returns {Promise<void>}
 */
export async function $bootstrap () {
  intro(
    bgPrimary(descriptionCLI) + bgSecondary(nameCLI) + bgPrimary(versionCLI),
  )

  await checkIsGitRepository()

  const filesStaged = await getStagedFiles()

  if (filesStaged.length) {
    const filesToAdd = filesStaged.join(' ')
    console.log(bgSuccess('\n You have files staged ' + filesToAdd + ' \n'))
    return await $runCLI(filesToAdd, filesStaged)
  }

  const filesChanged = await getChangedFiles()

  if (!filesStaged.length && !filesChanged.length) {
    return exitProgram('No files to commit')
  }

  const { filesSelectedToCommit } = await CLIFilesCommit(filesChanged)
  const filesToAdd = filesSelectedToCommit.join(' ')

  await $runCLI(filesToAdd, filesSelectedToCommit)
}
