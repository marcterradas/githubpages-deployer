require('dotenv').config()

const { performance } = require('perf_hooks')
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

import { Response } from './interfaces'
import { askCommitMessage, build, cleanFolder, moveDistFolder, gitPush } from './functions'

/**
 * init method
 * @returns { Promise<boolean> } false if any error, true if all okay.
 */
export const init = async (): Promise<boolean> => {
    // ask user about commit message
    const commitMessage: string = await askCommitMessage()

    const startTime: number = performance.now()

    // build vue project
    const startBuildTime: number = performance.now()
    const buildResponse: Response = await build(projectPath)

    if (!buildResponse.status) {
        console.error(buildResponse)
        return false
    }

    const endBuildTime: number = (performance.now() - startBuildTime) / 1000
    console.log(`\u2705 build completed! time: ${endBuildTime.toFixed(2)} seconds`)

    // clean github page folder
    const startCleanFolderTime: number = performance.now()
    const cleanFolderResponse: Response = await cleanFolder(githubPagePath)

    if (!cleanFolderResponse.status) {
        console.error(cleanFolderResponse)
        return false
    }

    const endCleanFolderTime: number = (performance.now() - startCleanFolderTime) / 1000
    console.log(`\u2705 clean destiny folder completed! time: ${endCleanFolderTime.toFixed(2)} seconds`)

    // move dist folder to github page folder
    const startMoveDistFolderTime: number = performance.now()
    const moveDistFolderResponse: Response = await moveDistFolder(projectPath, githubPagePath)

    if (!moveDistFolderResponse.status) {
        console.error(moveDistFolderResponse)
        return false
    }

    const endMoveDistFolderTime: number = (performance.now() - startMoveDistFolderTime) / 1000
    console.log(`\u2705 move dist folder to destiny folder completed! time: ${endMoveDistFolderTime.toFixed(2)} seconds`)

    // push to github
    const startPushToGithub: number = performance.now()
    const gitPushResponse: Response = await gitPush(commitMessage, githubPagePath)

    if (!gitPushResponse.status) {
        console.error(gitPushResponse)
        return false
    }

    const endTimeGitPush: number = (performance.now() - startPushToGithub) / 1000
    console.log(`\u2705 git push completed! time: ${endTimeGitPush.toFixed(2)} seconds`)

    const endTime: number = (performance.now() - startTime) / 1000
    console.log(`\u2705 deploy completed! total time: ${endTime.toFixed(2)} seconds`)

    return true
}

init()
