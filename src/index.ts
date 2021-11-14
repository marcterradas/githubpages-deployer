require('dotenv').config()

const { performance } = require('perf_hooks');
const {promisify} = require('util')
const exec = promisify(require('child_process').exec)

const githubUsername: string | undefined = process.env.GITHUB_USERNAME
const githubPassword: string | undefined = process.env.GITHUB_PASSWORD
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

interface Response {
    code: number;
    status: boolean;
    msg: string;
}

/**
 * init method
 * @returns { Promise<boolean> } false if any error, true if all okay.
 */
const init = async (): Promise<boolean> => {

    const startTime: number = performance.now()

    // build vue project
    const startBuildTime: number = performance.now()
    const buildResponse: Response = await build()

    if(!buildResponse.status){
        console.error(buildResponse)
        return false
    }

    const endBuildTime: number = (performance.now() - startBuildTime) / 1000
    console.log(`\u2705 build completed! time: ${endBuildTime.toFixed(2)} seconds`)

    // clean github page folder
    const startCleanFolderTime: number = performance.now()
    const cleanFolderResponse: Response = await cleanFolder()
 
    if(!cleanFolderResponse.status){
        console.error(cleanFolderResponse)
        return false
    }

    const endCleanFolderTime: number = (performance.now() - startCleanFolderTime) / 1000
    console.log(`\u2705 clean destiny folder completed! time: ${endCleanFolderTime.toFixed(2)} seconds`)

    // move dist folder to github page folder
    const startMoveDistFolderTime: number = performance.now()
    const moveDistFolderResponse: Response = await moveDistFolder()

    if(!moveDistFolderResponse.status){
        console.error(moveDistFolderResponse)
        return false
    }

    const endMoveDistFolderTime: number = (performance.now() - startMoveDistFolderTime) / 1000
    console.log(`\u2705 move dist folder to destiny folder completed! time: ${endMoveDistFolderTime.toFixed(2)} seconds`)

    // push to github
    const startPushToGithub: number = performance.now()
    const gitPushResponse: Response = await gitPush()

    if(!gitPushResponse.status){
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
 * Build vue project from project path.
 * @returns { Promise } Promise with object of type Response.
 */
const build = async (): Promise<Response> => {

    if(!projectPath) {
        const response : Response = { code: 1, status: false, msg: 'project path is required' }
        return response
    }

    const buildQuery : string = `npm run build --prefix ${projectPath}`

    try {

        const { stdout, stderr } = await exec(buildQuery);
        const response : Response = { code: 2, status: true, msg: 'build completed' }
        return response

    } catch (error: any) {

        const response : Response = { code: 3, status: false, msg: error }
        return response

    }

}

/**
 * Clean destiny folder.
 * @returns { Promise } Promise with object of type Response.
 */
const cleanFolder = async (): Promise<Response> => {

    if(!githubPagePath){
        const response : Response = { code: 1, status: false, msg: 'github page path is required' }
        return response
    }

    const query = `rm -rf ${githubPagePath}/*`

    try {

        const { stdout, stderr } = await exec(query);
        const response : Response = { code: 2, status: true, msg: 'clean destiny folder completed' }
        return response

    } catch (error: any) {

        const response : Response = { code: 3, status: false, msg: error }
        return response

    }

}

/**
 * Move dist folder to destiny folder.
 * @returns { Promise } Promise with object of type Response.
 */
const moveDistFolder = async (): Promise<Response> => {
    // TODO
    const response : Response = { code: 1, status: true, msg: '' }
    return response
}

/**
 * pull changes to github
 * @returns { Promise } Promise with object of type Response.
 */
const gitPush = async (): Promise<Response> => {
    // TODO
    const response : Response = { code: 1, status: true, msg: '' }
    return response
}

init()