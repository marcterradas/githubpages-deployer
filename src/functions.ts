const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const question = require('readline-sync').question

import { Response } from './interfaces'

/**
 * recursive function until user input string with length bigger than 0.
 * @returns { String }
 */
export const askCommitMessage = (): string => {
    const answer: string = question('commit message: \n')

    if (answer.length == 0) {
        askCommitMessage()
    }

    return answer
}

/**
 * Build vue project from project path.
 * @param { string | undefined } projectPath
 * @returns { Promise } Promise with object of type Response.
 */
export const build = async (projectPath: string | undefined): Promise<Response> => {
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
 * @param { string | undefined } githubPagePath
 * @returns { Promise } Promise with object of type Response.
 */
export const cleanFolder = async (githubPagePath: string | undefined): Promise<Response> => {
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
 * @param { string | undefined } projectPath
 * @param { string | undefined } githubPagePath
 * @returns { Promise } Promise with object of type Response.
 */
export const moveDistFolder = async (projectPath: string | undefined, githubPagePath: string | undefined): Promise<Response> => {
    if (!projectPath) {
        const response: Response = { code: 1, status: false, msg: 'project path is required' }
        return response
    }

    if (!githubPagePath) {
        const response: Response = { code: 1, status: false, msg: 'github page path is required' }
        return response
    }

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
 * @param { string } commitMessage
 * @param { string | undefined } githubPagePath
 * @returns { Promise } Promise with object of type Response.
 */
export const gitPush = async (commitMessage: string, githubPagePath: string | undefined): Promise<Response> => {
    if (!githubPagePath) {
        const response: Response = { code: 1, status: false, msg: 'github page path is required' }
        return response
    }

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
