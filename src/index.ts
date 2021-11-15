require('dotenv').config()

const { performance } = require('perf_hooks')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const question = require('readline-sync').question

const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

interface Response {
    code: number
    status: boolean
    msg: string
}

/**
 * init method
 * @returns { Promise<boolean> } false if any error, true if all okay.
 */
const init = async (): Promise<boolean> => {
    // ask user about commit message
    const commitMessage: string = await askCommitMessage()

    const startTime: number = performance.now()

    // build vue project
    const startBuildTime: number = performance.now()
    const buildResponse: Response = await build()

    if (!buildResponse.status) {
        console.error(buildResponse)
        return false
    }

    const endBuildTime: number = (performance.now() - startBuildTime) / 1000
    console.log(`\u2705 build completed! time: ${endBuildTime.toFixed(2)} seconds`)

    // clean github page folder
    const startCleanFolderTime: number = performance.now()
    const cleanFolderResponse: Response = await cleanFolder()

    if (!cleanFolderResponse.status) {
        console.error(cleanFolderResponse)
        return false
    }

    const endCleanFolderTime: number = (performance.now() - startCleanFolderTime) / 1000
    console.log(`\u2705 clean destiny folder completed! time: ${endCleanFolderTime.toFixed(2)} seconds`)

    // move dist folder to github page folder
    const startMoveDistFolderTime: number = performance.now()
    const moveDistFolderResponse: Response = await moveDistFolder()

    if (!moveDistFolderResponse.status) {
        console.error(moveDistFolderResponse)
        return false
    }

    const endMoveDistFolderTime: number = (performance.now() - startMoveDistFolderTime) / 1000
    console.log(`\u2705 move dist folder to destiny folder completed! time: ${endMoveDistFolderTime.toFixed(2)} seconds`)

    // push to github
    const startPushToGithub: number = performance.now()
    const gitPushResponse: Response = await gitPush(commitMessage)

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

/**
 * recursive function until user input string with length bigger than 0.
 * @returns { String }
 */
const askCommitMessage = (): string => {
    const answer: string = question('commit message: \n')

    if (answer.length == 0) {
        askCommitMessage()
    }

    return answer
}

/**
 * Build vue project from project path.
 * @returns { Promise } Promise with object of type Response.
 */
const build = async (): Promise<Response> => {
    if (!projectPath) {
        const response: Response = { code: 1, status: false, msg: 'project path is required' }
        return response
    }

    const query: string = `npm run build --prefix ${projectPath}`

    try {
        const { stdout, stderr } = await exec(query)
        const response: Response = { code: 2, status: true, msg: 'build completed' }
        return response
    } catch (error: any) {
        const response: Response = { code: 3, status: false, msg: error }
        return response
    }
}

/**
 * Clean destiny folder.
 * @returns { Promise } Promise with object of type Response.
 */
const cleanFolder = async (): Promise<Response> => {
    if (!githubPagePath) {
        const response: Response = { code: 1, status: false, msg: 'github page path is required' }
        return response
    }

    const query: string = `rm -rf ${githubPagePath}/*`

    try {
        const { stdout, stderr } = await exec(query)
        const response: Response = { code: 2, status: true, msg: 'clean destiny folder completed' }
        return response
    } catch (error: any) {
        const response: Response = { code: 3, status: false, msg: error }
        return response
    }
}

/**
 * Move dist folder to destiny folder.
 * @returns { Promise } Promise with object of type Response.
 */
const moveDistFolder = async (): Promise<Response> => {
    // here is not required to validate two paths becouse they are validated in previous methods
    const query: string = `cp -a ${projectPath}/dist/. ${githubPagePath}`

    try {
        const { stdout, stderr } = await exec(query)
        const response: Response = { code: 1, status: true, msg: 'move dist folder to destiny folder completed' }
        return response
    } catch (error: any) {
        const response: Response = { code: 2, status: false, msg: error }
        return response
    }
}

/**
 * pull changes to github
 * @returns { Promise } Promise with object of type Response.
 */
const gitPush = async (commitMessage: string): Promise<Response> => {
    const query1: string = `git -C ${githubPagePath} add .`
    const query2: string = `git -C ${githubPagePath} commit -m "${commitMessage}"`
    const query3: string = `git -C ${githubPagePath} push`

    try {
        const { stdout1, stderr1 } = await exec(query1)
        const { stdout2, stderr2 } = await exec(query2)
        const { stdout3, stderr3 } = await exec(query3)

        const response: Response = { code: 1, status: true, msg: 'git push completed!' }
        return response
    } catch (error: any) {
        const response: Response = { code: 2, status: false, msg: error }
        return response
    }
}

init()
